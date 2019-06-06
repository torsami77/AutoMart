import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import cloudinary from 'cloudinary';

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

const storage = multer.diskStorage({
  filename: (req, carImage, callback) => {
    callback(null, new Date().toISOString() + carImage.originalname);
  },
});

const upload = multer({
  storage,
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_ID,
  api_secret: process.env.API_SECRET,
});

export default { verifyToken, upload, cloudinary };
