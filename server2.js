var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// INA
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var mysql      = require('mysql');
var dbconfig   = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/', function(req, res){
        console.log(req.body);
        res.send("Connected");
});

app.post('/test', function(req,res){
        var obj = req.body;

        console.log(obj);

        console.log("PARAMETERS")
        console.log(obj.action.parameters);  // 요기에 누구에서 넘어온(2번에서 명시한) parameter 담겨있음

        obj.output = {"response" : "방가워요!!!!"};  // 요렇게 누구로 넘길 data 넣기
        obj.resultCode ="OK";  // 요렇게 resultCode 설정

        if(obj.action.parameters.name.value.includes("우주"))
                obj.resultCode="hello";   // 요렇게 resultCode 설정

        res.send(obj)
        res.end;

});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
        next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
        console.log("ERROR!");
  // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
        res.status(err.status || 500);
        res.render('error');
});

module.exports = app;