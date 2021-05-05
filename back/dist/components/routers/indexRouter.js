"use strict";
var features = require("../visionAPITS/detectingImgs");
var router = require('express').Router();
router.post('/getIdx/labellist', features.detectingLabel);
router.post('/getIdx/logolist', features.detectingLogo);
router.post('/getIdx/objectlist', features.localizeObjects);
router.post('/getIdx/textline', features.detectingText);
module.exports = router;
//# sourceMappingURL=indexRouter.js.map