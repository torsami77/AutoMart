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

const signIn = (req, res) => {
  const {
    email,
    password
  } = req.body;
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (undefined === email || !email.match(mailformat)) {
    return res.status(400).send({
      status: 400,
      error: 'Please Enter a Valid Email!',
      success: 'false',
      field: 'email'
    });
  }

  if (undefined === password) {
    return res.status(400).json({
      status: 400,
      error: 'Please enter your password!',
      success: 'false',
      field: 'password'
    });
  } // const searchedUser = db.users.find(user => user.email === email);


  _pg.default.query('SELECT id,email,password,is_admin FROM users WHERE email = $1', [email], (_err, data) => {
    if (data && data.rows[0]) {
      const searchedUser = data.rows[0];

      _bcryptjs.default.compare(password, searchedUser.password, (err, isMatched) => {
        if (!isMatched) {
          return res.status(401).json({
            status: 401,
            error: 'Invalid Signin Credentials!',
            success: 'false',
            field: 'password'
          }); // eslint-disable-next-line no-else-return
        }

        if (isMatched) {
          // eslint-disable-next-line camelcase
          const {
            id,
            is_admin
          } = searchedUser;

          _bcryptjs.default.hash(password, 10, (error, hash) => {
            const token = _jsonwebtoken.default.sign({
              email,
              hash,
              id,
              is_admin
            }, process.env.SECRET_KEY, {
              expiresIn: '1h'
            });

            res.cookie('username', searchedUser.username);
            res.cookie('token', token);
            return res.status(202).json({
              status: 202,
              data: {
                success: 'true',
                message: 'Auth successful!',
                token
              }
            });
          });
        }

        return false;
      });
    } else {
      return res.status(401).json({
        status: 401,
        error: 'Invalid Signin Credentials!',
        success: 'false',
        field: 'password'
      }); // eslint-disable-next-line no-else-return
    }

    return false;
  });

  return false;
};

var _default = signIn;
exports.default = _default;