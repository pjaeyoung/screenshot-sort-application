"use strict";
var express = require('express');
// const dotenv = require('dotenv');
var modules = require('../src/components/visionAPITS/detectingImgs');
//require('dotenv').config;
var app = express();
//dotenv.config();
var api_key = process.env.GOOGLE_APPLICATION_CREDENTIALS;
var indexRouter = require('./components/routers/indexRouter');
var server = app.listen(8002, function () {
    console.log("API listen port 8002");
});
app.use(express.json());
app.use('/', indexRouter);
modules.exports = server;
//# sourceMappingURL=index.js.map