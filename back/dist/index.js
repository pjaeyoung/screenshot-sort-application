"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var modules = require('../src/components/visionAPITS/detectingImgs');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
console.log(typeof modules.DectectingLabel);
//# sourceMappingURL=index.js.map