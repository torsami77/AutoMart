import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import db from '../db/db';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


const signIn = (req, res) => {
  const { email, password } = req.body;
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (undefined === email || !email.match(mailformat)) {
    return res.status(401).send({
      status: 401,
      error: 'Please Enter a Valid Email!',
      success: 'false',
      field: 'email',
    });
  }


  if (undefined === password) {
    return res.status(401).json({
      status: 401,
      error: 'Please enter your password!',
      success: 'false',
      field: 'password',
    });
  }
  const searchedUser = db.users.find(user => user.email === email);
  if (undefined === searchedUser) {
    return res.status(401).json({
      status: 401,
      error: 'Invalid Signin Credentials!',
      success: 'false',
    });
  }
  bcrypt.compare(password, searchedUser.password).then((ismatched) => {
    if (!ismatched) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid Signin Credentials!',
        success: 'false',
      });
    }
    if (ismatched) {
      bcrypt.hash(password, 10, (error, hash) => {
        const token = jwt.sign({
          email,
          hash,
        }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.cookie('username', searchedUser.username);
        res.cookie('token', token);
        return res.status(200).json({
          status: 200,
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
  return false;
};

export default signIn;
