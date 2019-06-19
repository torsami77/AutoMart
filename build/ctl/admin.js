"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = _interopRequireDefault(require("../db/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.text());
app.use(_bodyParser.default.json({
  type: 'application/json'
}));

const employJwt = (req, res) => {
  const {
    authorization
  } = req.headers;

  try {
    const decoded = _jsonwebtoken.default.verify(authorization, process.env.SECRET_KEY);

    req.userData = decoded;
  } catch (error) {
    return res.status(403).send({
      status: 403,
      error: 'You need Admin priviledges to perform this task!',
      success: 'false'
    });
  }

  return false;
};

class Admin {
  static viewSpecific(req, res) {
    employJwt(req, res);
    let checkAdmin = 0;

    _db.default.users.map(user => {
      if (user.id === req.userData.id && user.is_admin === true) {
        checkAdmin = 1;
      }

      return false;
    });

    const specifiedCar = _db.default.cars.find(car => car.id === parseInt(req.params.carId, 10));

    if (!specifiedCar) {
      return res.status(404).send({
        staus: 404,
        error: 'Ad not found',
        success: 'false'
      });
    }

    if (checkAdmin === 1 && specifiedCar) {
      return res.status(200).send({
        status: 200,
        data: specifiedCar,
        success: 'true'
      }); // eslint-disable-next-line no-else-return
    }

    return false;
  }

  static viewAll(req, res) {
    employJwt(req, res);
    let checkAdmin = 0;

    _db.default.users.map(user => {
      if (user.id === req.userData.id && user.is_admin === true) {
        checkAdmin = 1;
      }

      return false;
    });

    if (checkAdmin === 1) {
      ///administrator
      // eslint-disable-next-line object-curly-newline
      let {
        status,
        state,
        minPrice,
        maxPrice,
        manufacturer,
        model,
        bodyType
      } = req.query; //let { minPrice } = req.query;
      // eslint-disable-next-line object-curly-newline

      const searchObjects = {
        status,
        state,
        minPrice,
        maxPrice,
        manufacturer,
        model,
        bodyType
      };
      const searchTerm = [status, state, minPrice, maxPrice, manufacturer, model, bodyType];
      const searchFields = [];
      searchTerm.forEach(item => {
        if (undefined !== item) {
          searchFields.push(item);
        }
      });
      const arrOfSearch = [];

      if (undefined === minPrice) {
        minPrice = 0;
      }

      if (maxPrice) {
        _db.default.cars.map(car => {
          Object.keys(searchObjects).forEach(keyItem => {
            if ((keyItem !== 'minPrice' || keyItem !== 'maxPrice') && car.price >= minPrice && car.price <= maxPrice && undefined !== car[keyItem] && car[keyItem] === searchObjects[keyItem] && !arrOfSearch.includes(car)) {
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
            field: searchFields
          });
          return false;
        }

        if (undefined !== arrOfSearch && arrOfSearch.length !== 0) {
          res.status(200).send({
            status: 200,
            success: 'true',
            data: arrOfSearch
          });
          return false;
        }
      }

      _db.default.cars.map(car => {
        Object.keys(searchObjects).forEach(keyItem => {
          if (undefined !== car[keyItem] && car[keyItem] === searchObjects[keyItem] && !arrOfSearch.includes(car)) {
            arrOfSearch.push(car);
          }
        });
        return false;
      });

      if (undefined !== arrOfSearch && arrOfSearch.length !== 0) {
        res.status(200).send({
          status: 200,
          success: 'true',
          data: arrOfSearch
        });
        return false;
      } // if previous search conditions weren't thought, search returns all available Ad


      if (_db.default.cars) {
        return res.status(200).send({
          status: 200,
          data: _db.default.cars,
          success: 'true'
        }); // eslint-disable-next-line no-else-return
      } else {
        res.status(404).send({
          status: 404,
          error: 'Your Search wasn\'t found',
          success: 'false',
          field: searchFields
        });
      } // eslint-disable-next-line no-else-return

    } else {
      return res.status(403).send({
        status: 403,
        error: 'You need Admin priviledges to view this set of data!',
        success: 'false'
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
        field: 'order'
      });
    }

    const isAdmin = _db.default.users.find(user => user.id === req.userData.id && user.is_admin === true);

    if (isAdmin) {
      const counter = _db.default.cars.findIndex(car => car.id === parseInt(req.params.carId, 10));

      const searchedAd = _db.default.cars.find(car => car.id === parseInt(req.params.carId, 10));

      if (searchedAd) {
        _db.default.cars.splice(counter, 1);

        return res.status(200).send({
          status: 200,
          data: {
            message: 'Car Ad successfully deleted!',
            success: 'true'
          }
        }); // eslint-disable-next-line no-else-return
      } else {
        return res.status(404).send({
          status: 404,
          error: 'Ad not found!',
          success: 'false'
        });
      } // eslint-disable-next-line no-else-return

    }
  }

}

var _default = Admin;
exports.default = _default;