"use strict";
//이후에 디자인 다시!
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    detectingLabel: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var vision, client, labelsreturn_1, file, result, labels, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    vision = require('@google-cloud/vision');
                    client = new vision.ImageAnnotatorClient();
                    labelsreturn_1 = [];
                    file = req.body.filename;
                    return [4 /*yield*/, client.labelDetection(file)];
                case 1:
                    result = (_a.sent())[0];
                    labels = result.labelAnnotations;
                    labels.forEach(function (label) {
                        //labelsreturn.push(label.description)
                        labelsreturn_1.push(label.description);
                    });
                    console.log(labelsreturn_1);
                    res.status(200).json({ 'Labels': labelsreturn_1 });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    if (e_1.errno === -2) { //no such file or directory
                        console.log(e_1.message);
                        res.status(400).json({ 'error': '이미지 파일 경로를 확인해주세요' });
                    }
                    else {
                        console.log("new error:", e_1);
                        res.status(400).json({ 'error': '에러생김' });
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    detectingLogo: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var vision, client, file, logosreturn_1, result, logos, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    vision = require('@google-cloud/vision');
                    client = new vision.ImageAnnotatorClient();
                    file = req.body.filename;
                    logosreturn_1 = [];
                    return [4 /*yield*/, client.logoDetection(file)];
                case 1:
                    result = (_a.sent())[0];
                    logos = result.logoAnnotations;
                    logos.forEach(function (logo) {
                        logosreturn_1.push(logo.description);
                    });
                    res.status(200).json({ 'Logos': logosreturn_1 });
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    if (e_2.errno === -2) { //no such file or directory
                        console.log(e_2.message);
                        res.status(400).json({ 'error': '이미지 파일 경로를 확인해주세요' });
                    }
                    else {
                        res.status(400).json({ 'error': '에러생김' });
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    detectingText: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var vision, client, textreturn_1, file, result, textlines, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    vision = require('@google-cloud/vision');
                    client = new vision.ImageAnnotatorClient();
                    textreturn_1 = [];
                    file = req.body.filename;
                    return [4 /*yield*/, client.textDetection(file)];
                case 1:
                    result = (_a.sent())[0];
                    textlines = result.textAnnotations;
                    textlines.forEach(function (text) {
                        return textreturn_1.push(text.description);
                    });
                    //[END vision_text_detection]
                    res.status(200).json({ 'locale': textlines[0].locale, 'textline': textlines[0].description });
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    if (e_3.errno === -2) { //no such file or directory
                        console.log(e_3.message);
                        res.status(400).json({ 'error': '이미지 파일 경로를 확인해주세요' });
                    }
                    else {
                        console.log(e_3);
                        res.status(400).json({ 'error': '에러생김' });
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    localizeObjects: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var vision, fs, client, file, objectreturn_1, request, result, objects, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    vision = require('@google-cloud/vision');
                    fs = require('fs');
                    client = new vision.ImageAnnotatorClient();
                    file = req.body.filename;
                    objectreturn_1 = [];
                    request = {
                        image: { content: fs.readFileSync(file) },
                    };
                    return [4 /*yield*/, client.objectLocalization(request)];
                case 1:
                    result = (_a.sent())[0];
                    if (!result)
                        throw new Error("file not found");
                    objects = result.localizedObjectAnnotations;
                    if (objects.length === 0)
                        throw new Error("cannot get objects");
                    objects.forEach(function (object) {
                        console.log("Name: " + object.name);
                        console.log("Confidence: " + object.score);
                        objectreturn_1.push({ "Name": object.name, "Confidence": object.score });
                        // const vertices = object.boundingPoly.normalizedVertices; (객체위치)
                        // vertices.forEach((v: { x: any; y: any; }) => objectreturn.push(`x: ${v.x}, y:${v.y}`));
                    });
                    res.status(200).json({ "object": objectreturn_1 });
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    if (e_4.errno === -2) { //no such file or directory
                        console.log(e_4.message);
                        res.status(400).json({ 'error': '이미지 파일 경로를 확인해주세요' });
                    }
                    else {
                        res.status(400).json({ 'error': '에러생김' });
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }
};
// [END vision_quickstar
//# sourceMappingURL=detectingImgs.js.map