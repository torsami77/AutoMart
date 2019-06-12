import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import signUp from './ctl/signUp';
import signIn from './ctl/signIn';
import seller from './ctl/seller';
import viewer from './ctl/viewer';
import buyer from './ctl/buyer';
import admin from './ctl/admin';
import password from './ctl/resetPassword';
import verifyToken from './mid/verifyToken';
import cloudUpload from './mid/cloudinaryAndMulter';


const PORT = process.env.PORT || 5000;
const app = express();
const { upload } = cloudUpload;


const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static('./ui'));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.sendFile(path.resolve('./ui/index.html'));
});

app.post('/api/v1/signup', signUp);
app.post('/api/v1/signin', signIn);
app.post('/api/v1/car', verifyToken, upload.single('carImage'), seller.postAd);
app.patch('/api/v1/car/:carId/price', verifyToken, seller.updatePrice);
app.patch('/api/v1/car/:carId/status', verifyToken, seller.markAsSold);
app.get('/api/v1/car', viewer.dynamicView);
app.get('/api/v1/car/:carId/', viewer.specificCar);
app.post('/api/v1/flag', verifyToken, buyer.flag);
app.post('/api/v1/order', verifyToken, buyer.order);
app.patch('/api/v1/order/:orderId/price', verifyToken, buyer.updateOrder);
app.delete('/api/v1/car/:carId/', verifyToken, admin.delete);
app.post('/api/v1/password/reset', password.resetRequest);
app.post('/api/v1/password/createnew', verifyToken, password.createNewPassword);
app.all('*', (req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Endpoint not found!',
    success: false,
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default { app };
