"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _db = _interopRequireDefault(require("../db/db"));

var _cloudinaryAndMulter = _interopRequireDefault(require("../mid/cloudinaryAndMulter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const {
  cloudinary
} = _cloudinaryAndMulter.default;
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.text());
app.use(_bodyParser.default.json({
  type: 'application/json'
}));

class Seller {
  static postAd(req, res) {
    let {
      // eslint-disable-next-line max-len
      manufacturer,
      model,
      bodyType,
      year,
      mileage,
      state,
      location,
      transmission,
      vehicleInspectionNumber,
      licence,
      description,
      price
    } = req.body;

    if (!manufacturer || manufacturer === ' ') {
      res.status(400).send({
        status: 400,
        error: 'manufacturer field cannot be empty!',
        success: 'false',
        field: 'manufacturer'
      });
      return false;
    }

    if (!model || model === ' ') {
      res.status(400).send({
        status: 400,
        error: 'model field cannot be empty!',
        success: 'false',
        field: 'model'
      });
      return false;
    }

    if (!bodyType || bodyType === ' ') {
      res.status(400).send({
        status: 400,
        error: 'body type field cannot be empty!',
        success: 'false',
        field: 'bodyType'
      });
      return false;
    }

    if (!year) {
      res.status(400).send({
        status: 400,
        error: 'year field cannot be empty!',
        success: 'false',
        field: 'year'
      });
      return false;
    }

    if (isNaN(parseInt(year, 10))) {
      res.status(422).send({
        status: 422,
        error: 'invalid year input!',
        success: 'false',
        field: 'year'
      });
      return false;
    }

    if (!mileage) {
      res.status(400).send({
        status: 400,
        error: 'mileage field cannot be empty!',
        success: 'false',
        field: 'mileage'
      });
      return false;
    }

    if (isNaN(parseFloat(mileage))) {
      res.status(422).send({
        status: 422,
        error: 'invalid mileage input!',
        success: 'false',
        field: 'mileage'
      });
      return false;
    }

    if (!state || state === ' ') {
      res.status(400).send({
        status: 400,
        error: 'state field cannot be empty!',
        success: 'false',
        field: 'state'
      });
      return false;
    }

    if (!location || location === ' ') {
      res.status(400).send({
        status: 400,
        error: 'location field cannot be empty!',
        success: 'false',
        field: 'location'
      });
      return false;
    }

    if (!transmission || transmission === ' ') {
      res.status(400).send({
        status: 400,
        error: 'transmission field cannot be empty!',
        success: 'false',
        field: 'transmission'
      });
      return false;
    }

    if (!vehicleInspectionNumber || vehicleInspectionNumber === ' ') {
      res.status(400).send({
        status: 400,
        error: 'vehicle inspection number field cannot be empty!',
        success: 'false',
        field: 'vehicleInspectionNumber'
      });
      return false;
    }

    if (!licence || licence === ' ') {
      res.status(400).send({
        status: 400,
        error: 'licence field cannot be empty!',
        success: 'false',
        field: 'licence'
      });
      return false;
    }

    if (!description || description === ' ') {
      res.status(400).send({
        status: 400,
        error: 'description field cannot be empty!',
        success: 'false',
        field: 'description'
      });
      return false;
    }

    if (!price) {
      res.status(400).send({
        status: 400,
        error: 'price field cannot be empty!',
        success: 'false',
        field: 'price'
      });
      return false;
    }

    if (isNaN(parseFloat(price))) {
      res.status(422).send({
        status: 422,
        error: 'invalid price input!',
        success: 'false',
        field: 'price'
      });
      return false;
    }

    if (!req.file) {
      res.status(400).send({
        status: 400,
        error: 'Upload at least one image!',
        success: 'false',
        field: 'carImage'
      });
      return false;
    }

    if (!req.file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      res.status(422).send({
        status: 422,
        error: 'Please provide a valid image file!',
        success: 'false',
        field: 'carImage'
      });
      return false;
    } // eslint-disable-next-line no-unused-vars


    cloudinary.uploader.upload(req.file.path, (result, _error) => {
      if (result.secure_url) {
        const imageGallery = [result.secure_url];
        const orders = [];
        const flags = [];
        const id = _db.default.cars.length + 1;
        const createdOn = new Date();
        const status = 'available';
        price = parseFloat(price);
        mileage = parseFloat(mileage);
        year = parseFloat(year);
        const newCar = {
          id,
          owner: req.userData.id,
          created_on: createdOn,
          // eslint-disable-next-line object-property-newline
          state,
          status,
          price,
          manufacturer,
          model,
          bodyType,
          year,
          mileage,
          // eslint-disable-next-line object-property-newline
          transmission,
          vehicleInspectionNumber,
          licence,
          description,
          imageGallery,
          orders,
          flags
        };

        _db.default.cars.push(newCar);

        res.status(201).send({
          status: 201,
          data: {
            id,
            email: req.userData.email,
            created_on: createdOn,
            manufacturer,
            model,
            price,
            state,
            status,
            imageGallery,
            message: 'Your Ad has been added successfully!',
            success: 'true'
          }
        });
        return false;
      }

      res.status(500).send({
        status: 500,
        error: 'No response from Cloudinary!, Please try again ',
        success: 'false',
        field: 'Cloudinary'
      });
      return false;
    });
    return false;
  }

  static updatePrice(req, res) {
    if (isNaN(parseFloat(req.body.price))) {
      res.status(400).send({
        status: 400,
        error: 'Invalid Price value!',
        success: 'false',
        field: 'Price'
      });
      return false;
    }

    if (isNaN(parseInt(req.params.carId, 10))) {
      res.status(400).send({
        status: 400,
        error: 'Invalid Param Request!',
        success: 'false',
        field: 'Price'
      });
      return false;
    }

    const carId = parseInt(req.params.carId, 10);
    const newPrice = parseFloat(req.body.price);
    let checker = 0;
    let theCar;

    _db.default.cars.map(car => {
      if (car.id === carId) {
        checker = 1;

        if (car.status !== 'sold' && car.owner === req.userData.id) {
          car.price = newPrice;
          checker = 2;
          theCar = car;
        }
      }

      return false;
    });

    if (checker === 2) {
      res.status(201).send({
        status: 201,
        data: {
          id: req.userData.id,
          email: req.userData.email,
          created_on: theCar.created_on,
          manufacturer: theCar.manufacturer,
          model: theCar.model,
          price: theCar.price,
          state: theCar.state,
          status: theCar.status,
          message: 'New price Updated!',
          success: 'True',
          field: 'Price'
        }
      });
      return false;
    }

    if (checker === 1) {
      res.status(403).send({
        status: 403,
        error: 'You cannot change the price of this Ad!',
        success: 'false',
        field: 'Price'
      });
      return false;
    }

    if (checker === 0) {
      res.status(404).send({
        status: 404,
        error: 'Ad not found in database!',
        success: 'false',
        field: 'Price'
      });
      return false;
    }

    return false;
  }

  static markAsSold(req, res) {
    if (isNaN(parseInt(req.params.carId, 10))) {
      res.status(400).send({
        status: 400,
        error: 'Invalid Param Request!',
        success: 'false',
        field: 'sold'
      });
      return false;
    }

    const carId = parseInt(req.params.carId, 10);
    let newStatus;
    let theCar;

    _db.default.cars.map(car => {
      if (car.id === carId && car.owner === req.userData.id) {
        car.status = 'sold';
        newStatus = 'sold';
        theCar = car;
      }

      return false;
    });

    if (newStatus) {
      res.status(201).send({
        status: 201,
        data: {
          id: req.userData.id,
          email: req.userData.email,
          created_on: theCar.created_on,
          manufacturer: theCar.manufacturer,
          model: theCar.model,
          price: theCar.price,
          state: theCar.state,
          status: theCar.status,
          message: 'Car marked as sold!',
          success: 'True',
          field: 'sold'
        }
      });
      return false; // eslint-disable-next-line no-else-return
    } else {
      res.status(403).send({
        status: 403,
        error: 'You are not allowed to mark this Ad as sold!',
        success: 'false',
        field: 'Price'
      });
      return false;
    }
  }

}

var _default = Seller;
exports.default = _default;