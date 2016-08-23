/**
 * Created by Admin on 22.08.2016.
 */
module.exports = function(pool){
    return {
        add: function(username, password, callback) {
            pool.query('INSERT INTO users SET ?, ?', [{name: username},{pass: password}], callback);
        },

        find: function(req, callback) {
            pool.query('SELECT * FROM users WHERE ?', {name: req}, callback);
        }
    };
};
