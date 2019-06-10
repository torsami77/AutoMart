"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var automail = function automail(to, subject, text) {
  var transporter = _nodemailer["default"].createTransport({
    service: 'gmail',
    auth: {
      user: 'automailer77@gmail.com',
      pass: process.env.AUTOMAILER_PASS
    }
  });

  var mailOptions = {
    from: 'youremail@gmail.com',
    to: to,
    subject: subject,
    text: text
  }; // eslint-disable-next-line no-unused-vars

  transporter.sendMail(mailOptions, function (error, _info) {
    if (error) {
      return false;
    }

    return true;
  });
};

var _default = automail;
exports["default"] = _default;