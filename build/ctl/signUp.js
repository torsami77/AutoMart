"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _pg = _interopRequireDefault(require("../mid/pg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.text());
app.use(_bodyParser.default.json({
  type: 'application/json'
}));

const signUp = (req, res) => {
  let {
    username,
    firstName,
    lastName,
    address
  } = req.body; // eslint-disable-next-line prefer-const

  const {
    email,
    password,
    verify
  } = req.body;
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (undefined === username || username === '') {
    return res.status(400).send({
      status: 400,
      error: 'Please Provide a Username',
      success: 'false',
      field: 'username'
    });
  }

  if (undefined === email || !email.match(mailformat)) {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter a Valid Email',
      success: 'false',
      field: 'email'
    });
  }

  if (undefined === firstName || firstName === ' ') {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter your First Name',
      success: 'false',
      field: 'firstName'
    });
  }

  if (undefined === lastName || lastName === ' ') {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter your Last Name',
      success: 'false',
      field: 'lastName'
    });
  }

  if (undefined === address || address === ' ') {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter your Address',
      success: 'false',
      field: 'address'
    });
  }

  if (undefined === password || password === ' ') {
    return res.status(400).send({
      status: 400,
      error: 'Please Provide a Password',
      success: 'false',
      field: 'password'
    });
  }

  if (undefined !== password && password.length < 8) {
    return res.status(400).send({
      status: 400,
      error: 'Password is Too Short!',
      success: 'false',
      field: 'password'
    });
  }

  if (verify !== password) {
    return res.status(400).send({
      status: 400,
      error: 'Verifiable Password Does not Match!',
      success: 'false',
      field: 'verify'
    });
  } // const emailSearch = db.users.find(user => user.email === email);
  // const userNameSearch = db.users.find(user => user.username === username);


  _pg.default.query('SELECT email, username FROM users WHERE email = $1 OR username = $2', [email, username], (_err, data) => {
    if (data.rows[0]) {
      if (data.rows[0].email === email) {
        return res.status(400).send({
          status: 400,
          error: 'Email is associated with another user!',
          success: 'false',
          field: 'email'
        });
      }

      if (data.rows[0].username === username) {
        return res.status(400).send({
          status: 400,
          error: 'Username already taken by another user!',
          success: 'false',
          field: 'username'
        });
      }

      return false; // eslint-disable-next-line no-else-return
    } else {
      _bcryptjs.default.hash(password, 10, (error, hash) => {
        if (error) {
          return res.status(500).send({
            status: 500,
            error,
            field: 'password'
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
          created_on: new Date()
        }; // db.users.push(newUser);

        _pg.default.query(`INSERT INTO users (email, username, first_name, last_name, password, address, is_admin, created_on) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`, // eslint-disable-next-line max-len
        [newUser.email, newUser.username, newUser.first_name, newUser.last_name, newUser.password, newUser.address, newUser.is_admin, newUser.created_on], (err, resp) => {
          if (resp) {
            const {
              id
            } = resp.rows[0];

            const token = _jsonwebtoken.default.sign({
              email,
              hash,
              id
            }, process.env.SECRET_KEY, {
              expiresIn: '1h'
            });

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
                message: 'Your Signed up was successful'
              }
            });
          }

          if (err) {
            return res.status(500).send({
              status: 500,
              error: 'Internal Server Error, Please consult your Admin'
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

var _default = signUp;
exports.default = _default;