var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var Yelp = require('yelp');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  var err = new Error('Not Found');
  err.status = 404;
    var headers = String(req.path);
    while(headers.charAt(0) === '/')
    headers = headers.substr(1);
    console.log(headers)
    var index = headers.indexOf("/");
    var location = headers.substr(0, index);
    var cusine = headers.substr(index + 1);
    console.log(location);
    console.log(cusine)
    var yelp = new Yelp({
        consumer_key: 'T8p3rlxD_eQLz6Jl7ePghw',
        consumer_secret: 'q_y5_QnNCzfe2MiSyB7baEqGkCk',
        token: 'GDHL7uPryiq5DNf1nScszTgyH6Uba7Zg',
        token_secret: 'LzHSrY-YdxEcRqWpmUVHkg5ZcfI'
    });
    yelp.search({ term: "food", location: location, limit: "2", category_filter: cusine })
        .then(function (data) {
            console.log(data);
            res.send(data)
            //res.render()
        })
        .catch(function (err) {
            console.error(err);
        });

    //next(err);
    
});

// error handlers

// development error handler
// will print stacktrace


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
