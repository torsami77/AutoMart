import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import pool from '../mid/pg';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


const signIn = (req, res) => {
  const { email, password } = req.body;
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (undefined === email || (!email.match(mailformat))) {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter a Valid Email!',
      success: 'false',
      field: 'email',
    });
  }


  if (undefined === password) {
    return res.status(400).json({
      status: 400,
      error: 'Please enter your password!',
      success: 'false',
      field: 'password',
    });
  }
  // const searchedUser = db.users.find(user => user.email === email);

  pool.query('SELECT email,password FROM users WHERE email = $1', [email],
    (_err, data) => {
      const searchedUser = data.rows[0];
      if (undefined === searchedUser) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid Signin Credentials!',
          success: 'false',
        });
      // eslint-disable-next-line no-else-return
      } else {
        bcrypt.compare(password, searchedUser.password, (err, isMatched) => {
          if (err) {
            return res.status(401).json({
              status: 401,
              error: 'Invalid Signin Credentials!',
              success: 'false',
            });
          // eslint-disable-next-line no-else-return
          } 
          if (isMatched) {
            const { id } = searchedUser;
            bcrypt.hash(password, 10, (error, hash) => {
              const token = jwt.sign({
                email,
                hash,
                id,
              }, process.env.SECRET_KEY, { expiresIn: '1h' });
              res.cookie('username', searchedUser.username);
              res.cookie('token', token);
              return res.status(202).json({
                status: 202,
                data: {
                  success: 'true',
                  message: 'Auth successful!',
                  token,
                },
              });
            });
          }
          return false;
        });
      }
      return false;
    });
  return false;
};

export default signIn;
