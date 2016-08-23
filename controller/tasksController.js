/**
 * Created by Admin on 19.08.2016.
 */
module.exports = function(tasks){
    return {
        index: function(req, res) {
            tasks.list(req.user.name, function(err, tasks){
                res.render(
                    'tasks.hbs',
                    {tasks: tasks},
                    function(err, html) {
                        if(err)
                            throw err;
                        res.render('layout.hbs', {
                            content: html,
                            user: req.user.name
                        });
                    }
                )
            });
        },
        add: function(req, res) {
            tasks.add(req.body.task, req.user.name, function(){
                res.redirect('/todo');
            });
        },
        delId: function(req, res) {
            tasks.delete(req.params.id, function(){
                res.redirect('/todo');
            });
        },
        complete: function(req, res) {
            tasks.complete(req.params.id, req.params.status, function(){
                res.redirect('/todo');
            });
        },
        change: function(req, res) {
            tasks.change(req.params.id, req.params.text, function(){
                res.redirect('/todo');
            });
        },
        filterDone: function(req, res) {
            tasks.done(req.user.name, function(err, tasks){
                res.render(
                    'tasks.hbs',
                    {tasks: tasks},
                    function(err, html) {
                        if(err)
                            throw err;
                        res.render('layout.hbs', {
                            content: html,
                            user: req.user.name
                        });
                    }
                )
            });
        },
        filterTodo: function(req, res) {
            tasks.todo(req.user.name, function(err, tasks){
                res.render(
                    'tasks.hbs',
                    {tasks: tasks},
                    function(err, html) {
                        if(err)
                            throw err;
                        res.render('layout.hbs', {
                            content: html,
                            user: req.user.name
                        });
                    }
                )
            });
        },
        delAll: function(req, res) {
            tasks.delAll(function(){
                res.redirect('/todo');
            });
        },
        delDone: function(req, res) {
            tasks.delDone(function(){
                res.redirect('/todo');
            });
        }
    }
};
















