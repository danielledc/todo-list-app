let express = require('express');
let path = require('path');

let favicon = require('serve-favicon');
let logger = require('morgan');
let cors = require('cors');
let bodyParser = require('body-parser');
let routes = require('./src/routes/task');

let mongoose = require('mongoose');
let app = express();

const dbURI='mongodb://admin:test123@ds015924.mlab.com:15924/heroku_pjnlp2b5';

mongoose.Promise = global.Promise;

mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

// view engine setup

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send();
});

module.exports = app;