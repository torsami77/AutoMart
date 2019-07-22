"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'automailer77@gmail.com',
    pass: process.env.AUTOMAILER_PASS,
  },
});
*/
const transporter = _nodemailer.default.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  // use SSL
  auth: {
    user: 'torsami77@zoho.com',
    pass: 'zoho101'
  }
}); // eslint-disable-next-line no-unused-vars


var _default = transporter;
exports.default = _default;