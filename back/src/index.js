var express = require('express');

var app = express();
//dotenv.config();
var indexRouter = require('./components/routers/indexRouter');
app.set('port', process.env.PORT || 8002);
app.use('/', indexRouter);

module.exports = app;