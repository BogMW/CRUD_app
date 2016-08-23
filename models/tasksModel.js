module.exports = function(pool){
    return {
        list: function(user, callback) {
            pool.query('SELECT * FROM tasks WHERE ?',{name: user}, callback);
        },

        add: function(task, user, callback) {
            pool.query('INSERT INTO tasks SET ?, ?, ?', [{name: user}, {task: task}, {status: 0}], callback);
        },

        complete: function(id, status, callback) {
            pool.query('UPDATE tasks SET ? WHERE ?', [{status: status},{id: id}], callback);
        },

        change: function(task, callback) {
            pool.query('UPDATE tasks SET ?', {task: task}, callback);
        },

        delete: function(id, callback) {
            pool.query('DELETE FROM tasks WHERE ?', {id: id}, callback);
        },

        done: function(user, callback) {
             pool.query('SELECT * FROM tasks WHERE ? AND ?', [{name: user}, {status: 'checked'}], callback);
        },

        todo: function(user, callback) {
            pool.query('SELECT * FROM tasks WHERE ? AND ?', [{name: user}, {status: '0'}], callback);
        },

        delAll: function(callback) {
            pool.query('DELETE FROM tasks', callback);
        },

        delDone: function(callback) {
            pool.query('DELETE FROM tasks WHERE ?', {status: 'checked'}, callback);
        }
    };
};
