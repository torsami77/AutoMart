"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _path = _interopRequireDefault(require("path"));

var _signUp = _interopRequireDefault(require("./ctl/signUp"));

var _signIn = _interopRequireDefault(require("./ctl/signIn"));

var _seller = _interopRequireDefault(require("./ctl/seller"));

var _viewer = _interopRequireDefault(require("./ctl/viewer"));

var _buyer = _interopRequireDefault(require("./ctl/buyer"));

var _admin = _interopRequireDefault(require("./ctl/admin"));

var _resetPassword = _interopRequireDefault(require("./ctl/resetPassword"));

var _verifyToken = _interopRequireDefault(require("./mid/verifyToken"));

var _cloudinaryAndMulter = _interopRequireDefault(require("./mid/cloudinaryAndMulter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = process.env.PORT || 5000;
const app = (0, _express.default)();
const {
  upload
} = _cloudinaryAndMulter.default;

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.text());
app.use(_bodyParser.default.json({
  type: 'application/json'
}));
app.use(_express.default.static('./ui'));
app.use((0, _cookieParser.default)());
app.get('/', (req, res) => {
  res.sendFile(_path.default.resolve('./ui/index.html'));
});
app.post('/api/v1/auth/signup', _signUp.default);
app.post('/api/v1/auth/signin', _signIn.default);
app.post('/api/v1/car', _verifyToken.default, upload.single('image_url'), _seller.default.postAd);
app.patch('/api/v1/car/:carId/price', _verifyToken.default, _seller.default.updatePrice);
app.patch('/api/v1/car/:carId/status', _verifyToken.default, _seller.default.markAsSold);
app.get('/api/v1/car', _verifyToken.default, _viewer.default.dynamicView);
app.get('/api/v1/car/:carId/', _verifyToken.default, _viewer.default.specificCar);
app.post('/api/v1/flag', _verifyToken.default, _buyer.default.flag);
app.post('/api/v1/order', _verifyToken.default, _buyer.default.order);
app.patch('/api/v1/order/:orderId/price', _verifyToken.default, _buyer.default.updateOrder);
app.delete('/api/v1/car/:carId/', _verifyToken.default, _admin.default.deleteCar);
app.post('/api/v1/users/:email/reset_password', _resetPassword.default.resetRequest);
app.post('/api/v1/users/createnew_password', _verifyToken.default, _resetPassword.default.createNewPassword);
app.all('*', (req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Endpoint not found!',
    success: false
  });
});
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
var _default = {
  app
};
exports.default = _default;