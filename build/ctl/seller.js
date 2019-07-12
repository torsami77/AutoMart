"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cloudinaryAndMulter = _interopRequireDefault(require("../mid/cloudinaryAndMulter"));

var _pg = _interopRequireDefault(require("../mid/pg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */

/* eslint-disable prefer-const */

/* eslint-disable no-restricted-globals */
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
    }

    const imageGallery = []; // eslint-disable-next-line no-unused-vars

    cloudinary.uploader.upload(req.file.path, result => {
      if (result.secure_url) {
        imageGallery.push(result.secure_url);
        const orders = [];
        const flags = [];
        const createdOn = new Date();
        const status = 'available';
        price = parseFloat(price);
        mileage = parseFloat(mileage);
        const newCar = {
          owner: req.userData.id,
          created_on: createdOn,
          // eslint-disable-next-line object-property-newline
          state: state.toLowerCase(),
          status: status.toLowerCase(),
          price: parseFloat(price),
          manufacturer: manufacturer.toLowerCase(),
          model: model.toLowerCase(),
          bodyType: bodyType.toLowerCase(),
          year,
          mileage: parseFloat(mileage),
          // eslint-disable-next-line object-property-newline
          transmission,
          vehicleInspectionNumber,
          licence,
          description,
          imageGallery,
          orders,
          flags
        }; // db.cars.push(newCar);

        _pg.default.query(`INSERT INTO cars (owner, created_on, manufacturer, model, "bodyType", price, state, status,
        year, mileage, transmission, "vehicleInspectionNumber", licence, description, "imageGallery", orders, flags) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING id`, // eslint-disable-next-line max-len
        [req.userData.id, newCar.created_on, newCar.manufacturer, newCar.model, newCar.bodyType, newCar.price, newCar.state, newCar.status, // eslint-disable-next-line max-len
        newCar.year, newCar.mileage, newCar.transmission, newCar.vehicleInspectionNumber, newCar.licence, newCar.description, newCar.imageGallery, newCar.orders, newCar.flags], (_err, data) => {
          if (data.rows[0]) {
            const {
              id
            } = data.rows[0];
            return res.status(201).send({
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
            }); // eslint-disable-next-line no-else-return
          } else {
            return res.status(500).send({
              status: 500,
              error: 'Internal server error, please contact your admin'
            });
          }
        });
      } else {
        return res.status(500).send({
          status: 500,
          error: 'No response from Cloudinary!, Please try again ',
          success: 'false',
          field: 'Cloudinary'
        });
      }

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
        error: 'Invalid Car ID!',
        success: 'false',
        field: 'Price'
      });
      return false;
    }

    const carId = parseInt(req.params.carId, 10);
    const newPrice = parseFloat(req.body.price);

    _pg.default.query('SELECT status FROM cars WHERE id = $1 AND owner = $2', [carId, req.userData.id], // eslint-disable-next-line no-unused-vars
    (err, resp) => {
      let theCar = resp.rows[0];

      if (!theCar) {
        return res.status(404).send({
          status: 404,
          error: 'Ad not found or not owned by you!',
          success: 'false',
          field: 'price'
        }); // eslint-disable-next-line no-else-return
      } else {
        _pg.default.query('UPDATE cars SET price=$1 WHERE (id = $2 AND owner = $3 AND status != $4) RETURNING created_on, manufacturer, model, price, state, status', [newPrice, carId, req.userData.id, 'sold'], (_err, data) => {
          // eslint-disable-next-line prefer-destructuring
          theCar = data.rows[0];

          if (theCar) {
            return res.status(201).send({
              status: 201,
              data: {
                id: carId,
                owner: req.userData.id,
                email: req.userData.email,
                created_on: theCar.created_on,
                manufacturer: theCar.manufacturer,
                model: theCar.model,
                price: parseFloat(theCar.price),
                state: theCar.state,
                status: theCar.status,
                message: 'New price Updated!',
                success: 'true',
                field: 'price'
              }
            }); // eslint-disable-next-line no-else-return
          } else {
            return res.status(403).send({
              status: 403,
              error: 'You cannot change the price of this Ad!',
              success: 'false',
              field: 'Price'
            });
          }
        });
      }

      return false;
    });

    return false;
  }

  static markAsSold(req, res) {
    if (isNaN(parseInt(req.params.carId, 10))) {
      res.status(400).send({
        status: 400,
        error: 'Invalid Car ID!',
        success: 'false',
        field: 'carId'
      });
      return false;
    }

    const carId = parseInt(req.params.carId, 10);

    _pg.default.query('UPDATE cars SET status=$1 WHERE (id = $2 AND owner = $3) RETURNING created_on, manufacturer, model, price, state, status', ['sold', carId, req.userData.id], (_err, data) => {
      const theCar = data.rows[0];

      if (theCar) {
        return res.status(201).send({
          status: 201,
          data: {
            id: carId,
            owner: req.userData.id,
            email: req.userData.email,
            created_on: theCar.created_on,
            manufacturer: theCar.manufacturer,
            model: theCar.model,
            price: parseFloat(theCar.price),
            state: theCar.state,
            status: theCar.status,
            message: 'AD marked as sold!',
            success: 'true',
            field: 'sold'
          }
        }); // eslint-disable-next-line no-else-return
      } else {
        return res.status(403).send({
          status: 403,
          error: 'You are not allowed to mark this Ad as sold!',
          success: 'false',
          field: 'status'
        });
      }
    });

    return false;
  }

}

var _default = Seller;
exports.default = _default;