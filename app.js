/**
 * Created by Admin on 15.08.2016.
 */
var express = require('express'),
    app = express(),
    mysql = require('mysql'),
    cookieParser = require('cookie-parser'),
    templating = require('consolidate'),
    bodyParser = require('body-parser'),
    tasks = require('./models/tasks');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/\\/view');
app.use(express.static('public'));


app.get('/', function(req, res) {
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
});

app.post('/', function(req, res) {
    tasks.add(req.body.task, function(){
        res.redirect('/');
    });
});

app.post('/del/:id', function(req, res) {
    console.dir(req.params.id);
    tasks.delete(req.params.id, function(){
        res.redirect('/');
    });
});

app.post('/complete/:id/:status', function(req, res) {
    console.dir(req.params.id);
    tasks.complete(req.params.id, req.params.status, function(){
        res.redirect('/');
    });
});

app.post('/change/:id/:text', function(req, res) {
    console.dir(req.params.id);
    tasks.change(req.params.id, req.params.text, function(){
        res.redirect('/');
    });
});


app.listen(8080);
console.log('Server runing on 8080 port');

