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

var signUp = function signUp(req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      firstName = _req$body.firstName,
      lastName = _req$body.lastName,
      address = _req$body.address; // eslint-disable-next-line prefer-const

  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password,
      verify = _req$body2.verify;
  var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (undefined === username || username === '') {
    return res.status(400).send({
      status: 400,
      error: 'Please Provide a Username',
      success: 'false',
      field: 'username'
    });
  }

  if (undefined === email || !email.match(mailformat)) {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter a Valid Email',
      success: 'false',
      field: 'email'
    });
  }

  if (undefined === firstName || firstName === ' ') {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter your First Name',
      success: 'false',
      field: 'first-name'
    });
  }

  if (undefined === lastName || lastName === ' ') {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter your Last Name',
      success: 'false',
      field: 'last-name'
    });
  }

  if (undefined === address || address === ' ') {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter your Address',
      success: 'false',
      field: 'username'
    });
  }

  if (undefined === password || password === ' ') {
    return res.status(400).send({
      status: 400,
      error: 'Please Provide a Password',
      success: 'false',
      field: 'password'
    });
  }

  if (undefined !== password && password.length < 8) {
    return res.status(400).send({
      status: 400,
      error: 'Password is Too Short!',
      success: 'false',
      field: 'password'
    });
  }

  if (verify !== password) {
    return res.status(400).send({
      status: 400,
      error: 'Verifiable Password Does not Match!',
      success: 'false',
      field: 'password'
    });
  }

  var emailSearch = _db["default"].users.find(function (user) {
    return user.email === email;
  });

  var userNameSearch = _db["default"].users.find(function (user) {
    return user.username === username;
  });

  if (emailSearch) {
    return res.status(400).send({
      status: 400,
      error: 'Email is associated with another user!',
      success: 'false',
      field: 'email'
    });
  }

  if (userNameSearch) {
    return res.status(400).send({
      status: 400,
      error: 'Username already taken by another user!',
      success: 'false',
      field: 'username'
    });
  }

  _bcryptjs["default"].hash(password, 10, function (error, hash) {
    if (error) {
      return res.status(500).send({
        status: 500,
        error: error,
        field: 'password'
      });
    }

    var id = parseInt(_db["default"].users.length + 1, 10);

    var token = _jsonwebtoken["default"].sign({
      email: email,
      hash: hash,
      id: id
    }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });

    var newUser = {
      id: id,
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: hash,
      address: address,
      is_admin: false,
      created_on: new Date()
    };

    _db["default"].users.push(newUser);

    res.cookie('username', username);
    res.cookie('token', token);
    return res.status(201).send({
      status: 201,
      data: {
        id: newUser.id,
        token: token,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        success: 'true',
        message: 'Your Signed up was successful'
      }
    });
  });

  return false;
};

var _default = signUp;
exports["default"] = _default;