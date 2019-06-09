import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const decoded = jwt.verify(authorization, process.env.SECRET_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    res.cookie('userData', null);
    res.cookie('token', null);
    return res.status(403).send({
      status: 403,
      error: 'Unauthorised User!',
      success: 'false',
    });
  }
  return false;
};


export default verifyToken;
