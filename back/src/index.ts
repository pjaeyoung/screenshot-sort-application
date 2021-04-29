

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const modules = require('../src/components/visionAPITS/detectingImgs')

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text());


console.log(typeof modules.DectectingLabel)