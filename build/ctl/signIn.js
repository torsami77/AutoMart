"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _db = _interopRequireDefault(require("../db/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].text());
app.use(_bodyParser["default"].json({
  type: 'application/json'
}));

var signIn = function signIn(req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;
  var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (undefined === email || !email.match(mailformat)) {
    return res.status(401).send({
      status: 401,
      error: 'Please Enter a Valid Email!',
      success: 'false',
      field: 'email'
    });
  }

  if (undefined === password) {
    return res.status(401).json({
      status: 401,
      error: 'Please enter your password!',
      success: 'false',
      field: 'password'
    });
  }

  var searchedUser = _db["default"].users.find(function (user) {
    return user.email === email;
  });

  if (undefined === searchedUser) {
    return res.status(401).json({
      status: 401,
      error: 'Invalid Signin Credentials!',
      success: 'false'
    });
  }

  _bcryptjs["default"].compare(password, searchedUser.password).then(function (ismatched) {
    if (!ismatched) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid Signin Credentials!',
        success: 'false'
      });
    }

    if (ismatched) {
      var id = searchedUser.id;

      _bcryptjs["default"].hash(password, 10, function (error, hash) {
        var token = _jsonwebtoken["default"].sign({
          email: email,
          hash: hash,
          id: id
        }, process.env.SECRET_KEY, {
          expiresIn: '1h'
        });

        res.cookie('username', searchedUser.username);
        res.cookie('token', token);
        return res.status(200).json({
          status: 200,
          data: {
            success: 'true',
            message: 'Auth successful!',
            token: token
          }
        });
      });
    }

    return false;
  });

  return false;
};

var _default = signIn;
exports["default"] = _default;