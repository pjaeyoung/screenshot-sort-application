

const express = require('express');
const dotenv = require('dotenv');
const modules = require('../src/components/visionAPITS/detectingImgs')

const app = express();

dotenv.config();

const indexRouter = require('./components/routers/indexRouter');
const moduleRouter = require('./components/routers/modules/module');

app.set('port', process.env.PORT || 8002);

app.use('/', indexRouter);
app.use('/module',moduleRouter);
