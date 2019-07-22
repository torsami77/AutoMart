import nodemailer from 'nodemailer';

/*
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'automailer77@gmail.com',
    pass: process.env.AUTOMAILER_PASS,
  },
});
*/
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'torsami77@zoho.com',
    pass: 'zoho101',
  },
});
// eslint-disable-next-line no-unused-vars


export default transporter;
