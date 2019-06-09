/*
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db/db';
import automail from '../mid/automailer';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

class Password {
  static reset(req, res) {
    if (!req.body.email || !req.body.email.match(mailformat)) {
      return res.status(401).send({
        status: 401,
        error: 'Please provide a valid email!',
        success: 'false',
        field: 'email',
      });
    }
    const foundUser = db.users.find(user => user.email === req.body.email);
    if (foundUser) {
      const hash = foundUser.password;
      const { id } = foundUser;
      const firstName = foundUser.first_name;
      const { email } = req.body;
      const token = jwt.sign({
        email,
        hash,
        id,
      }, process.env.SECRET_KEY, { expiresIn: '1h' });
      const subject = 'Pasword reset link';
      const text = `<html>
      Hello ${firstName},</br>
      <p>You are receive this email because there was an action to reset your email on <br/>
      automart. he you would like to proceed please click the link below</p>

      <p><a href="www.automart.com/createnewpassword/${hash}">www.automart.com/createnewpassword/${hash}</a></p>
      
      <p>Best regards<br/>
      Auto Mart Team</br>
      </p>

      <strong>Your favourite platform to buy and sal Cars</strong>
      </html>`;

      const sendMail = automail(email, subject, text);
      if (sendMail) {
        return res.status(200).send({
          status: 200,
          data: {
            message: 'password reset link sent to your email',
            success: 'true',
            field: 'passordReset',
          },
        });
      // eslint-disable-next-line no-else-return
      } else {
        return res.status(500).send({
          status: 500,
          error: 'Request incomplete please try again',
        });
      }
    // eslint-disable-next-line no-else-return
    } else {
      return res.status(403).send({
        status: 403,
        error: 'No user found with such email',
        success: 'false',
      });
    }
  }

  static createNewPassword(req, res) {
    if (!req.body.password) {
      return res.status(401).send({
        status: 401,
        error: 'Please Create a New Password!',
        success: 'false',
        field: 'password',
      });
    }
    if (req.body.password.length < 8) {
      return res.status(401).send({
        status: 401,
        error: 'Password too Short!',
        success: 'false',
        field: 'password',
      });
    }
    if (req.body.verify !== req.body.password) {
      return res.status(401).send({
        status: 401,
        error: 'Verify Password Does\'t match!',
        success: 'false',
        field: 'verify',
      });
    }
    const { email, id } = req.userData;
    bcrypt.hash(password, 10, (error, hash) => {
      const token = jwt.sign({
        email,
        hash,
        id,
      }, process.env.SECRET_KEY, { expiresIn: '1h' });
      db.map.users((user) => {
        if (user.id === id && user.email === email) {
          user.password = hash;
                }
                return res.status(200).send({
                    status: 200,
                    data: {
                        token,
                        message: 'Your password has been reset Successfully',
                        success: 'true',
                    }
                })    
            });
        });

    }
}

export default Password;
*/
