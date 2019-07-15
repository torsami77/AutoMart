/* eslint-disable camelcase */
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import multer from 'multer';
import cloudinary from 'cloudinary';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


const storage = multer.diskStorage({
  filename: (req, image_url, callback) => {
    callback(null, new Date().toISOString() + image_url.originalname);
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

export default { upload, cloudinary };
