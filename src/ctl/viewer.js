/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
import express from 'express';
import bodyParser from 'body-parser';
import db from '../db/db';
import admin from './admin';
import pool from '../mid/pg';
import generateSearchString from '../hlp/handyFuncs';
import verifyToken from '../mid/verifyToken';

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

    // const specifiedCar = db.cars.find(car => car.id === parseInt(req.params.carId, 10));

    pool.query('SELECT * FROM cars WHERE id = $1', [req.params.carId],
      (_err, data) => {
        const specifiedCar = data.rows[0];
        if ((!data) || (!data.rows[0])) {
          return res.status(404).send({
            status: 404,
            error: 'Ad not found!',
            success: 'false',
            field: 'car',
          });
        // eslint-disable-next-line no-else-return
        } else {
          // eslint-disable-next-line no-lonely-if
         // if (specifiedCar.status === 'available') {
            return res.status(200).send({
              status: 200,
              data: specifiedCar,
              success: 'true',
              field: 'car',
            });
          // eslint-disable-next-line no-else-return
          /*
          } else {
            admin.viewSpecific(req, res);
          }
          */
        }
        return false;
      });
    return false;
  }

  static dynamicView(req, res) {
    // eslint-disable-next-line object-curly-newline
    let { status, state, min_price, max_price, manufacturer, model, body_type } = req.query;
    let minPrice = min_price;
    let maxPrice = max_price;
    let bodyType = body_type;
    // eslint-disable-next-line object-curly-newline
    const searchObjects = { status, state, minPrice, maxPrice, manufacturer, model, bodyType };
    const searchTerm = [status, state, minPrice, maxPrice, manufacturer, model, bodyType];
    const searchFields = [];
    searchTerm.forEach((item) => {
      if (undefined !== item) {
        searchFields.push(item);
      }
    });
    if (searchTerm.length < 1) {
      return res.status(404).send({
        status: 401,
        error: 'Please provide query parameter',
        success: 'false',
        field: 'car',
      });
    }

    // if (status === 'available') {
      if (undefined === minPrice) {
        minPrice = 0;
      }
      if (maxPrice || minPrice) {
        if (undefined === maxPrice) {
          maxPrice = 100000000;
        }
        const searchString = generateSearchString(searchObjects);
        pool.query(`SELECT * FROM cars WHERE round(price::numeric, 2) >= $1 AND round(price::numeric, 2) <= $2 AND status = $3 ${searchString}`, [minPrice, maxPrice, 'available'],
          (err, data) => {
            if (err || data.rows.length < 1) {
              return res.status(404).send({
                status: 404,
                error: 'Your Search wasn\'t found',
                success: 'false',
                field: searchFields,
              });
            // eslint-disable-next-line no-else-return
            } else {
              res.status(200).send({
                status: 200,
                success: 'true',
                data: data.rows,
              });
              return false;
            }
          });
      } else {
        const searchString = generateSearchString(searchObjects);
        pool.query(`SELECT * FROM cars WHERE status = $1 ${searchString}`, ['available'],
          (err, data) => {
            if (data.rows.length > 0) {
              return res.status(200).send({
                status: 200,
                success: 'true',
                data: data.rows,
              });
            } else {
              return res.status(404).send({
                status: 404,
                error: 'Your Search wasn\'t found',
                success: 'false',
                field: searchFields,
              });
            }
          });
      }
    /*
    } else {
      // If status=available not specified, search falls back to admin's view (sold and available)
      // admin.viewAll(req, res);
      admin.dynamicView(req, res);
    }
    */
    return false;
  }
}

export default Viewer;
