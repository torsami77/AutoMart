import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db/db';
import automail from '../mid/automailer';
import pool from '../mid/pg';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

class Password {
  static resetRequest(req, res) {
    if (undefined === req.params.email) {
      return res.status(400).send({
        status: 400,
        error: 'Please provide a valid email!',
        success: 'false',
        field: 'email',
      });
    // eslint-disable-next-line no-else-return
    }

    if (req.params.email === ' ' || !req.params.email.match(mailformat)) {
      return res.status(400).send({
        status: 400,
        error: 'Please provide a valid email!',
        success: 'false',
        field: 'email',
      });
    }

    let token;
    // const foundUser = db.users.find(user => user.email === req.params.email);
    pool.query('SELECT id,first_name,password FROM users WHERE email = $1', [req.params.email],
      (_err, data) => {
        if (data.rows[0]) {
          const foundUser = data.rows[0];
          const hash = foundUser.password;
          const { id } = foundUser;
          const firstName = foundUser.first_name;
          const { email } = req.params;
          token = jwt.sign({
            email,
            hash,
            id,
          }, process.env.SECRET_KEY, { expiresIn: '1h' });
          const subject = 'AUTOMART: Pasword reset link';
          const text = `
Hello ${firstName},

You receive this email because there was an action to reset your password on 
automart77.herokuapp.com. If you would like to proceed please copy the link below and paste in your browser address bar.

https://automart77.herokuapp.com/createnewpassword/${token}

The link will expire after 1hr.

Best regards
Auto Mart Team

Your favourite platform to buy and sale Cars
            `;

          const mailOptions = {
            from: 'bootcamp@automart.com',
            to: email,
            subject,
            text,
          };

          automail.sendMail(mailOptions)
            .then(() => res.status(200).send({
              status: 200,
              data: {
                message: 'password reset link sent to your email',
                success: 'true',
                field: 'passordReset',
                token,
              },
            }))
            .catch(() => res.status(500).send({
              success: 'false',
              status: 500,
              error: 'Request incomplete please try again',
            }));
        } else {
          return res.status(404).send({
            status: 404,
            error: 'No user found with such email',
            success: 'false',
          });
        }
        return false;
      });
  }

  static createNewPassword(req, res) {
    if (!req.body.password) {
      return res.status(400).send({
        status: 400,
        error: 'Please Enter a New Password!',
        success: 'false',
        field: 'password',
      });
    }
    if (req.body.password.length < 8) {
      return res.status(400).send({
        status: 400,
        error: 'Password too Short!',
        success: 'false',
        field: 'password',
      });
    }
    if (req.body.verify !== req.body.password) {
      return res.status(400).send({
        status: 400,
        error: 'Password Does\'t match!',
        success: 'false',
        field: 'verify',
      });
    }
    const { email, id } = req.userData;
    bcrypt.hash(req.body.password, 10, (error, hash) => {
      const token = jwt.sign({
        email,
        hash,
        id,
      }, process.env.SECRET_KEY, { expiresIn: '1h' });

      // const foundUser = db.users.find(user => user.id === id && user.email === email);
      pool.query('UPDATE users SET password=$3 WHERE (id=$1 AND email=$2)', [id, email, hash],
        (_err, data) => {
          if (data) {
            return res.status(200).send({
              status: 200,
              data: {
                token,
                message: 'Your password has been reset Successfully!',
                success: 'true',
              },
            });
          // eslint-disable-next-line no-else-return
          } else {
            return res.status(400).send({
              status: 401,
              error: 'User Invalid token',
              succcess: 'false',
            });
          }
        });
      return false;
    });
  }
}

export default Password;
