/**
 * Created by Admin on 15.08.2016.
 */
var express = require('express');
var app = express();
var mysql = require('mysql');
var config = require('./config.js');
var pool  = mysql.createPool(config);
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

var templates = require('consolidate');
app.engine('hbs', templates.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/\\/view');
app.use(express.static('public'));

var tasksModel = require('./models/tasksModel')(pool);
var taskController = require('./controller/tasksController')(tasksModel);

var userModel = require('./models/UserModel')(pool);
var userController = require('./controller/UserController')(userModel);

var session = require('cookie-session');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({keys: ['secret']}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy.Strategy(function(username, password, done) {
        userModel.find(username, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user[0].pass == (password)) { return done(null, false); }
            return done(null, user[0]);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.name);
});

passport.deserializeUser(function(id, done) {
    done(null, {name: id});
});

var auth = passport.authenticate(
    'local', {
        successRedirect: '/todo',
        failureRedirect: '/login'
    }
);
var mustBeAuthenticated = function(req, res, next) {
    req.isAuthenticated() ? next() : res.redirect('/login');
};

app.get('/login', function(req, res) {
    res.render(
        'login.hbs'
    )
});

app.post('/login', auth);

app.get('/', mustBeAuthenticated);
app.get('/',taskController.index);

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.get('/registration', function(req, res) {
    res.render(
        'registration.hbs'
    )
});

app.get('/todo', mustBeAuthenticated);
app.get('/todo', taskController.index);
app.post('/add', taskController.add);
app.post('/del/:id', taskController.delId);
app.post('/complete/:id/:status', taskController.complete);
app.post('/change/:id/:text', taskController.change);
app.post('/done', taskController.filterDone);
app.post('/todo', taskController.filterTodo);
app.post('/delAll', taskController.delAll);
app.post('/delDone', taskController.delDone);

app.post('/addUser', userController.add);
//app.post('/findUser', userController.find);



app.listen(8080);
console.log('Server runing on 8080 port');

