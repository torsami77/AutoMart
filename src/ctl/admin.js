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
      error: 'Unauthorised User!',
      success: 'false',
    });
  }
  return false;
};


class Admin {
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
      return res.status(200).send({
        status: 200,
        data: db.cars,
        success: 'true',
      });
    // eslint-disable-next-line no-else-return
    } else {
      return res.status(403).send({
        status: 403,
        error: 'You need Admin priviledges to view this set of data!',
        success: 'false',
      });
    }
  }

  static delete(req, res) {
    employJwt(req, res);
    if (!req.params.carId || isNaN(parseInt(req.params.carId, 10))) {
      return res.status(401).send({
        status: 401,
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
    } else {
      return res.status(403).send({
        status: 403,
        error: 'You need Admin priviledges to delete this Ad',
        success: 'false',
      });
    }
  }
}

export default Admin;
