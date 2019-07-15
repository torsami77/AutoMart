"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _multer = _interopRequireDefault(require("multer"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
const app = (0, _express.default)();

_dotenv.default.config();

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.text());
app.use(_bodyParser.default.json({
  type: 'application/json'
}));

const storage = _multer.default.diskStorage({
  filename: (req, image_url, callback) => {
    callback(null, new Date().toISOString() + image_url.originalname);
  }
});

const upload = (0, _multer.default)({
  storage
});

_cloudinary.default.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_ID,
  api_secret: process.env.API_SECRET
});

var _default = {
  upload,
  cloudinary: _cloudinary.default
};
exports.default = _default;