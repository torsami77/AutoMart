import express from 'express';
import bodyParser from 'body-parser';
import db from '../db/db';
import mynodeconfig from '../mynodeconfig';

const app = express();
const { cloudinary } = mynodeconfig;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


class Seller {
  static postAd(req, res) {
    const {
      // eslint-disable-next-line max-len
      manufacturer, model, bodyType, year, mileage, state, transmission, vehicleInspectionNumber, licence, description, price,
    } = req.body;

    if (!manufacturer) {
      return res.status(422).send({
        status: 422,
        error: 'manufacturer field cannot be empty!',
        success: 'false',
        field: 'manufacturer',
      });
    }

    if (!model) {
      return res.status(422).send({
        status: 422,
        error: 'model field cannot be empty!',
        success: 'false',
        field: 'model',
      });
    }

    if (!bodyType) {
      return res.status(422).send({
        status: 422,
        error: 'body type field cannot be empty!',
        success: 'false',
        field: 'bodyType',
      });
    }

    if (!year) {
      return res.status(422).send({
        status: 422,
        error: 'year field cannot be empty!',
        success: 'false',
        field: 'year',
      });
    }

    if (isNaN(parseInt(year, 10))) {
      return res.status(422).send({
        status: 422,
        error: 'invalid year input',
        success: 'false',
        field: 'year',
      });
    }

    if (!mileage) {
      return res.status(422).send({
        status: 422,
        error: 'mileage field cannot be empty!',
        success: 'false',
        field: 'mileage',
      });
    }

    if (isNaN(parseFloat(mileage))) {
      return res.status(422).send({
        status: 422,
        error: 'invalid mileage input',
        success: 'false',
        field: 'mileage',
      });
    }

    if (!state) {
      return res.status(422).send({
        status: 422,
        error: 'state field cannot be empty!',
        success: 'false',
        field: 'state',
      });
    }

    if (!transmission) {
      return res.status(422).send({
        status: 422,
        error: 'transmission field cannot be empty!',
        success: 'false',
        field: 'transmission',
      });
    }

    if (!vehicleInspectionNumber) {
      return res.status(422).send({
        status: 422,
        error: 'vehicle inspection number field cannot be empty!',
        success: 'false',
        field: 'vehicleInspectionNumber',
      });
    }

    if (!licence) {
      return res.status(422).send({
        status: 422,
        error: 'licence field cannot be empty!',
        success: 'false',
        field: 'licence',
      });
    }

    if (!description) {
      return res.status(422).send({
        status: 422,
        error: 'description field cannot be empty!',
        success: 'false',
        field: 'description',
      });
    }

    if (!price) {
      return res.status(422).send({
        status: 422,
        error: 'price field cannot be empty!',
        success: 'false',
        field: 'price',
      });
    }

    if (isNaN(parseFloat(price))) {
      return res.status(422).send({
        status: 422,
        error: 'invalid price input',
        success: 'false',
        field: 'price',
      });
    }
    if (!req.file) {
      return res.status(422).send({
        status: 422,
        error: 'Upload at least one image!',
        success: 'false',
        field: 'carImage',
      });
    }

    if (!req.file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return res.status(422).send({
        status: 422,
        error: 'Please provide a valid image file!',
        success: 'false',
        field: 'carImage',
      });
    }

    // eslint-disable-next-line no-unused-vars
    cloudinary.uploader.upload(req.file.path, (result, _error) => {
      if (result.secure_url) {
        const imageGallery = [result.secure_url];
        const orders = [];
        const flags = [];
        const id = db.cars.length + 1;
        const createdOn = new Date();
        const status = 'Available';

        const newCar = {
          id,
          owner: req.userData.id,
          created_on: createdOn,
          // eslint-disable-next-line object-property-newline
          state, status, price, manufacturer, model, bodyType, year, mileage,
          // eslint-disable-next-line object-property-newline
          transmission, vehicleInspectionNumber, licence, description, imageGallery, orders, flags,
        };
        db.cars.push(newCar);
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
            success: 'true',
          },
        });
      }
      return res.status(500).send({
        status: 500,
        error: 'No response from Cloudinary!, Please try again ',
        success: 'false',
        field: 'Cloudinary',
      });
    });
    return false;
  }

  static updatePrice(req, res) {

    if (!req.body.price || Number.isNaN(parseFloat(req.body.price))) {
      return res.status(401).send({
        status: 401,
        error: 'Invalid Price value!',
        success: 'false',
        field: 'Price',
      });
    }

    if (isNaN(parseInt(req.params.carId, 10))) {
      return res.status(401).send({
        status: 401,
        error: 'Invalid Param Request!',
        success: 'false',
        field: 'Price',
      });
    }
    const carId = parseInt(req.params.carId, 10);
    const newPrice = parseFloat(req.body.price);

    db.cars.map((car) => {
      if (car.id === carId) {
        if (car.status !== 'sold' && car.owner === req.userData.id) {
          car.price = newPrice;

          return res.status(201).send({
            status: 201,
            data: {
              id: req.userData.id,
              email: req.userData.email,
              created_on: car.created_on,
              manufacturer: car.manufacturer,
              model: car.model,
              price: car.price,
              state: car.state,
              status: car.status,
              message: 'New price Updated!',
              success: 'True',
              field: 'Price',
            },
          });
        }
        return res.status(403).send({
          status: 403,
          error: 'You cannot change the price of this Ad!',
          success: 'false',
          field: 'Price',
        });
      }
      return res.status(404).send({
        status: 404,
        error: 'Ad not found in database!',
        success: 'false',
        field: 'Price',
      });
    });
    return false;
  }

  static markAsSold(req, res) {
    if (Number.isNaN(parseInt(req.params.carId, 10))) {
      return res.status(401).send({
        status: 401,
        error: 'Invalid Param Request!',
        success: 'false',
        field: 'sold',
      });
    }
    const carId = parseInt(req.params.orderId, 10);

    db.cars.map((car) => {
      if (car.id === carId && car.owner === req.userData.id) {
        car.status = 'sold';

        return res.status(201).send({
          status: 201,
          data: {
            id: req.userData.id,
            email: req.userData.email,
            created_on: car.created_on,
            manufacturer: car.manufacturer,
            model: car.model,
            price: car.price,
            state: car.state,
            status: car.status,
            message: 'Car marked as sold!',
            success: 'True',
            field: 'sold',
          },
        });
      }
      return res.status(403).send({
        status: 403,
        error: 'You are not allowed to mark this Ad as sold!',
        success: 'false',
        field: 'Price',
      });
    });
    return false;
  }
}


export default Seller;
