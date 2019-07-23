import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'automailer77@gmail.com',
    pass: process.env.AUTOMAILER_PASS,
  },
});


// eslint-disable-next-line no-unused-vars


export default transporter;
