/**
 * Created by Admin on 22.08.2016.
 */
/**
 * Created by Admin on 19.08.2016.
 */
module.exports = function(users){
    return {
        add: function(req, res) {
            users.add(req.body.username, req.body.password, function(){
                res.redirect('/login');
            });
        }
    }
};
















