/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
import express from 'express';
import bodyParser from 'body-parser';
import generateSearchString from '../hlp/handyFuncs';
import pool from '../mid/pg';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

const employJwt = (req, res) => {
  if (req.userData && req.userData.is_admin === false) {
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
    if (req.userData && req.userData.is_admin) {
      if (!req.params.carId || isNaN(parseInt(req.params.carId, 10))) {
        return res.status(400).send({
          status: 400,
          error: 'Please provide a valid Ad reference!',
          success: 'false',
          field: 'car',
        });
      }
      pool.query('SELECT * FROM cars WHERE id = $1', [parseInt(req.params.carId, 10)], (_err, result) => {
        if (result.rows[0]) {
          return res.status(200).send({
            status: 200,
            data: result.rows[0],
            success: 'true',
          });
        } else {
          return res.status(404).send({
            staus: 404,
            error: 'Ad not found',
            success: 'false',
          });
        }
      });
    }
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

    employJwt(req, res);
    if (req.userData.is_admin) {
      if (!minPrice) {
        minPrice = 0;
      }
      if (maxPrice || minPrice) {
        if (undefined === maxPrice) {
          maxPrice = 10000000000;
        }
        const searchString = generateSearchString(searchObjects);
        pool.query(`SELECT * FROM cars WHERE round(price::numeric, 2) >= $1 AND round(price::numeric, 2) <= $2 ${searchString}`, [parseFloat(minPrice), parseFloat(maxPrice)],
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
        pool.query(`SELECT * FROM cars WHERE status = $1 OR status = $2 ${searchString}`, ['available', 'sold'],
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
    }
    return false;
  }

  static deleteCar(req, res) {
    employJwt(req, res);
    if (req.userData.is_admin) {
      if (!req.params.carId || isNaN(parseInt(req.params.carId, 10))) {
        return res.status(400).send({
          status: 400,
          error: 'Please provide a valid Ad reference!',
          success: 'false',
          field: 'ADs',
        });
      } else {
        pool.query('DELETE FROM cars WHERE id = $1', [parseInt(req.params.carId, 10)], (err, data) => {
          if (data.rowCount) {
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
        });
      }
    }
    return false;
  }
}

export default Admin;
