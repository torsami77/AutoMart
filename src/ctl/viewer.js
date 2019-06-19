import express from 'express';
import bodyParser from 'body-parser';
import db from '../db/db';
import admin from './admin';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


class Viewer {
  static specificCar(req, res) {
    if (!req.params.carId || isNaN(parseInt(req.params.carId, 10))) {
      res.status(400).send({
        status: 400,
        error: 'Please provide a valid Ad reference!',
        success: 'false',
        field: 'car',
      });
      return false;
    }
    let data;
    const specifiedCar = db.cars.find(car => car.id === parseInt(req.params.carId, 10));

    if (!specifiedCar) {
      res.status(404).send({
        status: 404,
        error: 'Ad not found!',
        success: 'false',
        field: 'car',
      });
      return false;
    // eslint-disable-next-line no-else-return
    } else {
      // eslint-disable-next-line no-lonely-if
      if (specifiedCar.status === 'available') {
        res.status(200).send({
          status: 200,
          data: specifiedCar,
          success: 'true',
          field: 'car',
        });
      } else {
        admin.viewSpecific(req, res);
      }
    }
  }

  static dynamicView(req, res) {
    // eslint-disable-next-line object-curly-newline
    let { status, state, minPrice, maxPrice, manufacturer, model, bodyType } = req.query;
    //let { minPrice } = req.query;
    // eslint-disable-next-line object-curly-newline
    const searchObjects = { state, minPrice, maxPrice, manufacturer, model, bodyType };
    const searchTerm = [state, minPrice, maxPrice, manufacturer, model, bodyType];
    const searchFields = [];
    searchTerm.forEach((item) => {
      if (undefined !== item) {
        searchFields.push(item);
      }
    });
    const arrOfSearch = [];

    if (status === 'available') {
      if (undefined === minPrice) {
        minPrice = 0;
      }
      if (maxPrice) {
        db.cars.map((car) => {
          Object.keys(searchObjects).forEach((keyItem) => {
            if ((keyItem !== 'minPrice' || keyItem !== 'maxPrice') && car.price >= minPrice && car.price <= maxPrice && undefined !== car[keyItem] && car.status === 'available' && car[keyItem] === searchObjects[keyItem] && (!arrOfSearch.includes(car))) {
              arrOfSearch.push(car);
            }
          });
          return false;
        });
        if (undefined === arrOfSearch || arrOfSearch.length === 0) {
          res.status(404).send({
            status: 404,
            error: 'Your Search wasn\'t found',
            success: 'false',
            field: searchFields,
          });
          return false;
        }

        if (undefined !== arrOfSearch && arrOfSearch.length !== 0) {
          res.status(200).send({
            status: 200,
            success: 'true',
            data: arrOfSearch,
          });
          return false;
        }
      }
      db.cars.map((car) => {
        Object.keys(searchObjects).forEach((keyItem) => {
          if (undefined !== car[keyItem] && car.status === 'available' && car[keyItem] === searchObjects[keyItem] && (!arrOfSearch.includes(car))) {
            arrOfSearch.push(car);
          }
        });
        return false;
      });
      if (undefined !== arrOfSearch && arrOfSearch.length !== 0) {
        res.status(200).send({
          status: 200,
          success: 'true',
          data: arrOfSearch,
        });
        return false;
      }

      // if previous search conditions weren't thought, search returns all available Ad
      db.cars.map((car) => {
        if (car.status === 'available') {
          arrOfSearch.push(car);
        }
        return false;
      });
      if (undefined === arrOfSearch || arrOfSearch.length === 0) {
        res.status(404).send({
          status: 404,
          error: 'Your Search wasn\'t found',
          success: 'false',
          field: searchFields,
        });
        return false;
      }
      res.status(200).send({
        status: 200,
        success: 'true',
        data: arrOfSearch,
      });
      return false;
    }
    // If status=available not specified, search falls back to admin's view all (sold and available)
    // admin.viewAll(req, res);
    admin.viewAll(req, res);
  }
}

export default Viewer;
