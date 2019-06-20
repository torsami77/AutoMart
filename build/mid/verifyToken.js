"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

const verifyToken = (req, res, next) => {
  const {
    authorization
  } = req.headers;

  try {
    const decoded = _jsonwebtoken.default.verify(authorization, process.env.SECRET_KEY);

    req.userData = decoded;
    next();
  } catch (error) {
    res.cookie('userData', null);
    res.cookie('token', null);
    return res.status(401).send({
      status: 401,
      error: 'Unauthorised User!',
      success: 'false'
    });
  }

  return false;
};

var _default = verifyToken;
exports.default = _default;