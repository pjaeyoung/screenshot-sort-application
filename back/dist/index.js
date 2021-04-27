"use strict";
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.listen(port, function () {
    console.log("app start", port);
});
//# sourceMappingURL=index.js.map