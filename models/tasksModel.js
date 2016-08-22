module.exports = function(pool){
    return {
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
            pool.query('UPDATE tasks SET ?', {task: task}, callback);
        },

        delete: function(id, callback) {
            pool.query('DELETE FROM tasks WHERE ?', {id: id}, callback);
        },

        done: function(callback) {
            pool.query('SELECT * FROM tasks WHERE ?', {status: 'checked'}, callback);
        },

        todo: function(callback) {
            pool.query('SELECT * FROM tasks WHERE ?', {status: '0'}, callback);
        },

        dellAll: function(callback) {
            pool.query('DELETE FROM tasks', callback);
        },

        dellDone: function(callback) {
            pool.query('DELETE FROM tasks WHERE ?', {status: 'checked'}, callback);
        }
    };
};
