/**
 * Created by Admin on 15.08.2016.
 */
var express = require('express');
var app = express();
var mysql = require('mysql');
var config = require('./config.js');
var pool  = mysql.createPool(config);
var cookieParser = require('cookie-parser');
var templating = require('consolidate');
var bodyParser = require('body-parser');
var tasksModel = require('./models/tasksModel')(pool);
var taskController = require('./controller/tasksController')(tasksModel);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/\\/view');
app.use(express.static('public'));


app.get('/', taskController.index);
app.post('/', taskController.add);
app.post('/del/:id', taskController.dellId);
app.post('/complete/:id/:status', taskController.complete);
app.post('/change/:id/:text', taskController.change);
app.post('/done', taskController.filterDone);
app.post('/todo', taskController.filterTodo);
app.post('/dellAll', taskController.dellAll);
app.post('/dellDone', taskController.dellDone);


app.listen(8080);
console.log('Server runing on 8080 port');

