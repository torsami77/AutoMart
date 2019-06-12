"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _db = _interopRequireDefault(require("../db/db"));

var _automailer = _interopRequireDefault(require("../mid/automailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].text());
app.use(_bodyParser["default"].json({
  type: 'application/json'
}));
var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

var Password =
/*#__PURE__*/
function () {
  function Password() {
    _classCallCheck(this, Password);
  }

  _createClass(Password, null, [{
    key: "resetRequest",
    value: function resetRequest(req, res) {
      if (undefined === req.body.email) {
        return res.status(401).send({
          status: 400,
          error: 'Please provide a valid email!',
          success: 'false',
          field: 'email'
        }); // eslint-disable-next-line no-else-return
      }

      if (req.body.email === ' ' || !req.body.email.match(mailformat)) {
        return res.status(401).send({
          status: 400,
          error: 'Please provide a valid email!',
          success: 'false',
          field: 'email'
        });
      }

      var token;

      var foundUser = _db["default"].users.find(function (user) {
        return user.email === req.body.email;
      });

      if (foundUser) {
        var hash = foundUser.password;
        var id = foundUser.id;
        var firstName = foundUser.first_name;
        var email = req.body.email;
        token = _jsonwebtoken["default"].sign({
          email: email,
          hash: hash,
          id: id
        }, process.env.SECRET_KEY, {
          expiresIn: '1h'
        });
        var subject = 'AUTOMART: Pasword reset link';
        var text = "\n      Hello ".concat(firstName, ",\n      You are receive this email because there was an action to reset your email on \n      automart. If you would like to proceed please copy the link below and paste in your browser address bar.\n\n      www.automart.com/createnewpassword/").concat(token, "\n      \n      Best regards\n      Auto Mart Team\n\n      Your favourite platform to buy and sale Cars\n      ");
        var mailOptions = {
          from: 'bootcamp@automart.com',
          to: email,
          subject: subject,
          text: text
        };

        _automailer["default"].sendMail(mailOptions).then(function () {
          return res.status(200).send({
            status: 200,
            data: {
              message: 'password reset link sent to your email',
              success: 'true',
              field: 'passordReset',
              token: token
            }
          });
        })["catch"](function () {
          return res.status(500).send({
            success: 'false',
            status: 500,
            error: 'Request incomplete please try again'
          });
        });
      } else {
        return res.status(404).send({
          status: 404,
          error: 'No user found with such email',
          success: 'false'
        });
      }

      return false;
    }
  }, {
    key: "createNewPassword",
    value: function createNewPassword(req, res) {
      if (!req.body.password) {
        return res.status(401).send({
          status: 400,
          error: 'Please Enter a New Password!',
          success: 'false',
          field: 'password'
        });
      }

      if (req.body.password.length < 8) {
        return res.status(401).send({
          status: 400,
          error: 'Password too Short!',
          success: 'false',
          field: 'password'
        });
      }

      if (req.body.verify !== req.body.password) {
        return res.status(401).send({
          status: 400,
          error: 'Password Does\'t match!',
          success: 'false',
          field: 'verify'
        });
      }

      var _req$userData = req.userData,
          email = _req$userData.email,
          id = _req$userData.id;

      _bcryptjs["default"].hash(req.body.password, 10, function (error, hash) {
        var token = _jsonwebtoken["default"].sign({
          email: email,
          hash: hash,
          id: id
        }, process.env.SECRET_KEY, {
          expiresIn: '1h'
        });

        var foundUser = _db["default"].users.find(function (user) {
          return user.id === id && user.email === email;
        });

        if (foundUser) {
          foundUser.password = hash;
          return res.status(200).send({
            status: 200,
            data: {
              token: token,
              message: 'Your password has been reset Successfully!',
              success: 'true'
            }
          }); // eslint-disable-next-line no-else-return
        } else {
          return res.status(401).send({
            status: 401,
            error: 'User Invalid token',
            succcess: 'false'
          });
        }
      });

      return false;
    }
  }]);

  return Password;
}();

var _default = Password;
exports["default"] = _default;