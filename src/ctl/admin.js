import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import db from '../db/db';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

const employJwt = (req, res) => {
  const { authorization } = req.headers;
  try {
    const decoded = jwt.verify(authorization, process.env.SECRET_KEY);
    req.userData = decoded;
  } catch (error) {
    return res.status(403).send({
      status: 403,
      error: 'You need Admin priviledges to perform this task!',
      success: 'false',
    });
  }
  return false;
};


class Admin {
  static viewSpecific(req, res) {
    employJwt(req, res);
    let checkAdmin = 0;
    db.users.map((user) => {
      if (user.id === req.userData.id && user.is_admin === true) {
        checkAdmin = 1;
      }
      return false;
    });
    const specifiedCar = db.cars.find(car => car.id === parseInt(req.params.carId, 10));
    if (!specifiedCar) {
      return res.status(404).send({
        staus: 404,
        error: 'Ad not found',
        success: 'false',
      });
    }
    if (checkAdmin === 1 && specifiedCar) {
      return res.status(200).send({
        status: 200,
        data: specifiedCar,
        success: 'true',
      });
    // eslint-disable-next-line no-else-return
    }
    return false;
  }

  static viewAll(req, res) {
    employJwt(req, res);
    let checkAdmin = 0;
    db.users.map((user) => {
      if (user.id === req.userData.id && user.is_admin === true) {
        checkAdmin = 1;
      }
      return false;
    });
    if (checkAdmin === 1) {
      ///administrator

      // eslint-disable-next-line object-curly-newline
      let { status, state, minPrice, maxPrice, manufacturer, model, bodyType } = req.query;
      //let { minPrice } = req.query;
      // eslint-disable-next-line object-curly-newline
      const searchObjects = { status, state, minPrice, maxPrice, manufacturer, model, bodyType };
      const searchTerm = [status, state, minPrice, maxPrice, manufacturer, model, bodyType];
      const searchFields = [];
      searchTerm.forEach((item) => {
        if (undefined !== item) {
          searchFields.push(item);
        }
      });
      const arrOfSearch = [];

      if (undefined === minPrice) {
        minPrice = 0;
      }
      if (maxPrice) {
        db.cars.map((car) => {
          Object.keys(searchObjects).forEach((keyItem) => {
            if ((keyItem !== 'minPrice' || keyItem !== 'maxPrice') && car.price >= minPrice && car.price <= maxPrice && undefined !== car[keyItem] && car[keyItem] === searchObjects[keyItem] && (!arrOfSearch.includes(car))) {
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
          if (undefined !== car[keyItem] && car[keyItem] === searchObjects[keyItem] && (!arrOfSearch.includes(car))) {
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
      if (db.cars) {
        return res.status(200).send({
          status: 200,
          data: db.cars,
          success: 'true',
        });
      // eslint-disable-next-line no-else-return
      } else {
        res.status(404).send({
          status: 404,
          error: 'Your Search wasn\'t found',
          success: 'false',
          field: searchFields,
        });
      }

    // eslint-disable-next-line no-else-return
    } else {
      return res.status(403).send({
        status: 403,
        error: 'You need Admin priviledges to view this set of data!',
        success: 'false',
      });
    }
    return false;
  }

  static deleteCar(req, res) {
    employJwt(req, res);
    if (!req.params.carId || isNaN(parseInt(req.params.carId, 10))) {
      return res.status(400).send({
        status: 400,
        error: 'Please provide a valid Ad reference!',
        success: 'false',
        field: 'order',
      });
    }
    const isAdmin = db.users.find(user => user.id === req.userData.id && user.is_admin === true);
    if (isAdmin) {
      const counter = db.cars.findIndex(car => car.id === parseInt(req.params.carId, 10));
      const searchedAd = db.cars.find(car => car.id === parseInt(req.params.carId, 10));
      if (searchedAd) {
        db.cars.splice(counter, 1);
        return res.status(200).send({
          status: 200,
          data: {
            message: 'Car Ad successfully deleted!',
            success: 'true',
          },
        });
      // eslint-disable-next-line no-else-return
      } else {
        return res.status(404).send({
          status: 404,
          error: 'Ad not found!',
          success: 'false',
        });
      }
    // eslint-disable-next-line no-else-return
    }
  }
}

export default Admin;
