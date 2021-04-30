"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var modules = require('./components/visionAPITS/detectingImgs');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

