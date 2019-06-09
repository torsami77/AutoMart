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
      res.status(401).send({
        status: 401,
        error: 'Please provide a valid Ad reference!',
        success: 'false',
        field: 'car',
      });
      return false;
    }
    let data;
    db.cars.map((car) => {
      if (car.id === parseInt(req.params.carId, 10)) {
        data = car;
      }
      return false;
    });
    if (undefined !== data) {
      res.status(200).send({
        status: 200,
        data,
        success: 'true',
        field: 'car',
      });
      return false;
    }
    res.status(404).send({
      status: 404,
      error: 'Ad not found!',
      success: 'false',
      field: 'car',
    });
    return false;
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
            error: 'Your Search wasn\'t not found',
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
          error: 'Your Search wasn\'t not found',
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