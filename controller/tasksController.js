/**
 * Created by Admin on 19.08.2016.
 */
module.exports = function(tasks){
    return {
        index: function(req, res) {
            tasks.list(function(err, tasks){
                console.dir(tasks);
                res.render(
                    'tasks.hbs',
                    {tasks: tasks},
                    function(err, html) {
                        if(err)
                            throw err;
                        console.log(html);
                        res.render('layout.hbs', {
                            content: html
                        });
                    }
                )
            });
        },
        add: function(req, res) {
            tasks.add(req.body.task, function(){
                res.redirect('/');
            });
        },
        dellId: function(req, res) {
            console.dir(req.params.id);
            tasks.delete(req.params.id, function(){
                res.redirect('/');
            });
        },
        complete: function(req, res) {
            console.dir(req.params.id);
            tasks.complete(req.params.id, req.params.status, function(){
                res.redirect('/');
            });
        },
        change: function(req, res) {
            console.dir(req.params.id);
            tasks.change(req.params.id, req.params.text, function(){
                res.redirect('/');
            });
        },
        filterDone: function(req, res) {
            console.dir(tasks);
            tasks.done(function(err, tasks){
                console.dir(tasks);
                res.render(
                    'tasks.hbs',
                    {tasks: tasks},
                    function(err, html) {
                        if(err)
                            throw err;
                        console.log(html);
                        res.render('layout.hbs', {
                            content: html
                        });
                    }
                )
            });
        },
        filterTodo: function(req, res) {
            console.dir(tasks);
            tasks.todo(function(err, tasks){
                console.dir(tasks);
                res.render(
                    'tasks.hbs',
                    {tasks: tasks},
                    function(err, html) {
                        if(err)
                            throw err;
                        console.log(html);
                        res.render('layout.hbs', {
                            content: html
                        });
                    }
                )
            });
        },
        dellAll: function(req, res) {
            tasks.dellAll(function(){
                res.redirect('/');
            });
        },
        dellDone: function(req, res) {
            tasks.dellDone(function(){
                res.redirect('/');
            });
        }
    }
};
















