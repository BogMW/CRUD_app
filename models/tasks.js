
var mysql = require('mysql');
var config = require('../config.js');
var pool  = mysql.createPool(config);

    var Tasks = {
        list: function(callback) {
            pool.query('SELECT * FROM tasks', callback);
        },

        add: function(task, callback) {
            pool.query('INSERT INTO tasks SET ?, ?', [{task: task},{status: 0}], callback);
        },

        complete: function(id, status, callback) {
            pool.query('UPDATE tasks SET ? WHERE ?', [{status: status},{id: id}], callback);
        },

        change: function(task, callback) {
            pool.query('UPDATE tasks SET ?', {task: task});
        },

        delete: function(id, callback) {
            pool.query('DELETE FROM tasks WHERE ?', {id: id}, callback);
        }
    };

module.exports = Tasks;