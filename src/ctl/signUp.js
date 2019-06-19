import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import db from '../db/db';
import models from '../mod/models';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


const signUp = async (req, res) => {
  let {
    username, firstName, lastName, address,
  } = req.body;
  // eslint-disable-next-line prefer-const

  const {
    email, password, verify,
  } = req.body;
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (undefined === username || username === '') {
    return res.status(400).send({
      status: 400,
      error: 'Please Provide a Username',
      success: 'false',
      field: 'username',
    });
  }

  if (undefined === email || !email.match(mailformat)) {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter a Valid Email',
      success: 'false',
      field: 'email',
    });
  }

  if (undefined === firstName || firstName === ' ') {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter your First Name',
      success: 'false',
      field: 'first-name',
    });
  }


  if (undefined === lastName || lastName === ' ') {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter your Last Name',
      success: 'false',
      field: 'last-name',
    });
  }

  if (undefined === address || address === ' ') {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter your Address',
      success: 'false',
      field: 'username',
    });
  }

  if (undefined === password || password === ' ') {
    return res.status(400).send({
      status: 400,
      error: 'Please Provide a Password',
      success: 'false',
      field: 'password',
    });
  }

  if (undefined !== password && password.length < 8) {
    return res.status(400).send({
      status: 400,
      error: 'Password is Too Short!',
      success: 'false',
      field: 'password',
    });
  }

  if (verify !== password) {
    return res.status(400).send({
      status: 400,
      error: 'Verifiable Password Does not Match!',
      success: 'false',
      field: 'password',
    });
  }

  //const emailSearch = db.users.find(user => user.email === email);
  //const userNameSearch = db.users.find(user => user.username === username);
  try {
    const data = await models.retrieveClause('email, username', 'users', `email = $1 || username = $2`, [email, username]);
    if (data.email === email) {
      return res.status(400).send({
        status: 400,
        error: 'Email is associated with another user!',
        success: 'false',
        field: 'email',
      });
    }
    if (data.username === username) {
      return res.status(400).send({
        status: 400,
        error: 'Username already taken by another user!',
        success: 'false',
        field: 'username',
      });
    }
  } catch (error) {
  }

  bcrypt.hash(password, 10, (error, hash) => {
    if (error) {
      return res.status(500).send({
        status: 500,
        error,
        field: 'password',
      });
    }
    const id = parseInt(db.users.length + 1, 10);
    const token = jwt.sign({
      email,
      hash,
      id,
    }, process.env.SECRET_KEY, { expiresIn: '1h' });

    const newUser = {
      id,
      email,
      first_name: firstName,
      last_name: lastName,
      password: hash,
      address,
      is_admin: false,
      created_on: new Date(),
    };
    db.users.push(newUser);

    res.cookie('username', username);
    res.cookie('token', token);
    return res.status(201).send({
      status: 201,
      data: {
        id: newUser.id,
        token,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        success: 'true',
        message: 'Your Signed up was successful',
      },
    });
  });
  return false;
};

export default signUp;
