/* eslint-disable camelcase */
/* eslint-disable prefer-const */
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


const signUp = (req, res) => {
  let {
    username, first_name, last_name, address,
  } = req.body;
  const firstName = first_name;
  const lastName = last_name;
  // eslint-disable-next-line prefer-const

  const {
    email, password, verify,
  } = req.body;
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!username) {
    username = 'No Username';
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
      field: 'first_name',
    });
  }


  if (undefined === lastName || lastName === ' ') {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter your Last Name',
      success: 'false',
      field: 'last_name',
    });
  }

  if (undefined === address || address === ' ') {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter your Address',
      success: 'false',
      field: 'address',
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

  if (verify && verify !== password) {
    return res.status(400).send({
      status: 400,
      error: 'Verifiable Password Does not Match!',
      success: 'false',
      field: 'verify',
    });
  }

  // const emailSearch = db.users.find(user => user.email === email);
  // const userNameSearch = db.users.find(user => user.username === username);
  pool.query('SELECT email, username FROM users WHERE email = $1 OR username = $2', [email, username],
    (_err, data) => {
      if (data.rows[0]) {
        if (data.rows[0].email === email) {
          return res.status(400).send({
            status: 400,
            error: 'Email is associated with another user!',
            success: 'false',
            field: 'email',
          });
        }
        if (data.rows[0].username === username) {
          return res.status(400).send({
            status: 400,
            error: 'Username already taken by another user!',
            success: 'false',
            field: 'username',
          });
        }
        return false;
      // eslint-disable-next-line no-else-return
      } else {
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            return res.status(500).send({
              status: 500,
              error,
              field: 'password',
            });
          }
          const newUser = {
            email,
            username,
            first_name: firstName,
            last_name: lastName,
            password: hash,
            address,
            is_admin: false,
            created_on: new Date(),
          };
          // eslint-disable-next-line camelcase
          const { is_admin } = newUser;
          // db.users.push(newUser);
          pool.query(`INSERT INTO users (email, username, first_name, last_name, password, address, is_admin, created_on) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
          // eslint-disable-next-line max-len
          [newUser.email, newUser.username, newUser.first_name, newUser.last_name, newUser.password, newUser.address, newUser.is_admin, newUser.created_on],
          (err, resp) => {
            if (resp) {
              const { id } = resp.rows[0];
              const token = jwt.sign({
                email,
                hash,
                id,
                is_admin,
              }, process.env.SECRET_KEY, { expiresIn: '1h' });

              res.cookie('username', username);
              res.cookie('token', token);
              return res.status(201).send({
                status: 201,
                data: {
                  id,
                  token,
                  first_name: newUser.first_name,
                  last_name: newUser.last_name,
                  email: newUser.email,
                  success: 'true',
                  message: 'Your Signed up was successful',
                },
              });
            }
            if (err) {
              return res.status(500).send({
                status: 500,
                error: 'Internal Server Error, Please consult your Admin',
              });
            }
            return false;
          });
          return false;
        });
        return false;
      }
    });
  return false;
};

export default signUp;
