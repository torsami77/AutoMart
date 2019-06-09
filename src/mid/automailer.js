import nodemailer from 'nodemailer';

const automail = (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'automailer77@gmail.com',
      pass: process.env.AUTOMAILER_PASS,
    },
  });

  const mailOptions = {
    from: 'youremail@gmail.com',
    to,
    subject,
    text,
  };

  // eslint-disable-next-line no-unused-vars
  transporter.sendMail(mailOptions, (error, _info) => {
    if (error) {
      return false;
    }
    return true;
  });
};

export default automail;
