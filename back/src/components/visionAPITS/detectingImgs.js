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
// [START vision_quickstart]
function dectectingLabel(filename, fileroot) {
    if (filename === void 0) { filename = undefined; }
    if (fileroot === void 0) { fileroot = undefined; }
    return __awaiter(this, void 0, void 0, function () {
        var vision, client, labelsreturn, result, labels;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vision = require('@google-cloud/vision');
                    client = new vision.ImageAnnotatorClient();
                    labelsreturn = [];
                    return [4 /*yield*/, client.labelDetection('/Users/jean/JEAN/JeansProject/ScCap/back/src/testimg/bunny.jpeg')];
                case 1:
                    result = (_a.sent())[0];
                    labels = result.labelAnnotations;
                    console.log('Labels:');
                    labels.forEach(function (label) {
                        //labelsreturn.push(label.description)
                        console.log(label.description);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function dectectingLogo(filename, fileroot) {
    if (filename === void 0) { filename = undefined; }
    if (fileroot === void 0) { fileroot = undefined; }
    return __awaiter(this, void 0, void 0, function () {
        var vision, client, logosreturn, result, logos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vision = require('@google-cloud/vision');
                    client = new vision.ImageAnnotatorClient();
                    logosreturn = [];
                    return [4 /*yield*/, client.logoDetection('/Users/jean/JEAN/JeansProject/ScCap/back/src/testimg/starbucks.png')];
                case 1:
                    result = (_a.sent())[0];
                    logos = result.logoAnnotations;
                    console.log('Logos:');
                    logos.forEach(function (logo) {
                        console.log(logo.description);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function detectingText(fileName, fileroot) {
    if (fileName === void 0) { fileName = undefined; }
    if (fileroot === void 0) { fileroot = undefined; }
    return __awaiter(this, void 0, void 0, function () {
        var vision, client, result, detections;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vision = require('@google-cloud/vision');
                    client = new vision.ImageAnnotatorClient();
                    return [4 /*yield*/, client.textDetection('/Users/jean/JEAN/JeansProject/ScCap/back/src/testimg/starbucks.png')];
                case 1:
                    result = (_a.sent())[0];
                    detections = result.textAnnotations;
                    console.log('Text:');
                    detections.forEach(function (text) { return console.log(text.description); });
                    return [2 /*return*/];
            }
        });
    });
}
function localizeObjects() {
    return __awaiter(this, void 0, void 0, function () {
        var vision, fs, client, fileName, request, result, objects;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vision = require('@google-cloud/vision');
                    fs = require('fs');
                    client = new vision.ImageAnnotatorClient();
                    fileName = "/Users/jean/JEAN/JeansProject/ScCap/back/src/testimg/butterfly.webp";
                    request = {
                        image: { content: fs.readFileSync(fileName) }
                    };
                    return [4 /*yield*/, client.objectLocalization(request)];
                case 1:
                    result = (_a.sent())[0];
                    objects = result.localizedObjectAnnotations;
                    objects.forEach(function (object) {
                        console.log("Name: " + object.name);
                        console.log("Confidence: " + object.score);
                        var vertices = object.boundingPoly.normalizedVertices;
                        vertices.forEach(function (v) { return console.log("x: " + v.x + ", y:" + v.y); });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    dectectingLabel: dectectingLabel,
    dectectingLogo: dectectingLogo,
    detectingText: detectingText
};
