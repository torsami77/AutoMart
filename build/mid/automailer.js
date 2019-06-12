"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var transporter = _nodemailer["default"].createTransport({
  service: 'gmail',
  auth: {
    user: 'automailer77@gmail.com',
    pass: process.env.AUTOMAILER_PASS
  }
}); // eslint-disable-next-line no-unused-vars


var _default = transporter;
exports["default"] = _default;