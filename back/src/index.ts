

const express = require('express');
// const dotenv = require('dotenv');
const modules = require('../src/components/visionAPITS/detectingImgs')

//require('dotenv').config;

const app = express();
//dotenv.config();

const api_key = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const indexRouter = require('./components/routers/indexRouter');

const server = app.listen(8002, function(){
    console.log("API listen port 8002")
})

app.use(express.json());
app.use('/', indexRouter);

modules.exports = server;