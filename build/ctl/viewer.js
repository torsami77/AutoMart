"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _db = _interopRequireDefault(require("../db/db"));

var _admin = _interopRequireDefault(require("./admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].text());
app.use(_bodyParser["default"].json({
  type: 'application/json'
}));

var Viewer =
/*#__PURE__*/
function () {
  function Viewer() {
    _classCallCheck(this, Viewer);
  }

  _createClass(Viewer, null, [{
    key: "specificCar",
    value: function specificCar(req, res) {
      if (!req.params.carId || isNaN(parseInt(req.params.carId, 10))) {
        res.status(401).send({
          status: 401,
          error: 'Please provide a valid Ad reference!',
          success: 'false',
          field: 'car'
        });
        return false;
      }

      var data;

      _db["default"].cars.map(function (car) {
        if (car.id === parseInt(req.params.carId, 10)) {
          data = car;
        }

        return false;
      });

      if (undefined !== data) {
        res.status(200).send({
          status: 200,
          data: data,
          success: 'true',
          field: 'car'
        });
        return false;
      }

      res.status(404).send({
        status: 404,
        error: 'Ad not found!',
        success: 'false',
        field: 'car'
      });
      return false;
    }
  }, {
    key: "dynamicView",
    value: function dynamicView(req, res) {
      // eslint-disable-next-line object-curly-newline
      var _req$query = req.query,
          status = _req$query.status,
          state = _req$query.state,
          minPrice = _req$query.minPrice,
          maxPrice = _req$query.maxPrice,
          manufacturer = _req$query.manufacturer,
          model = _req$query.model,
          bodyType = _req$query.bodyType; //let { minPrice } = req.query;
      // eslint-disable-next-line object-curly-newline

      var searchObjects = {
        state: state,
        minPrice: minPrice,
        maxPrice: maxPrice,
        manufacturer: manufacturer,
        model: model,
        bodyType: bodyType
      };
      var searchTerm = [state, minPrice, maxPrice, manufacturer, model, bodyType];
      var searchFields = [];
      searchTerm.forEach(function (item) {
        if (undefined !== item) {
          searchFields.push(item);
        }
      });
      var arrOfSearch = [];

      if (status === 'available') {
        if (undefined === minPrice) {
          minPrice = 0;
        }

        if (maxPrice) {
          _db["default"].cars.map(function (car) {
            Object.keys(searchObjects).forEach(function (keyItem) {
              if ((keyItem !== 'minPrice' || keyItem !== 'maxPrice') && car.price >= minPrice && car.price <= maxPrice && undefined !== car[keyItem] && car.status === 'available' && car[keyItem] === searchObjects[keyItem] && !arrOfSearch.includes(car)) {
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

        _db["default"].cars.map(function (car) {
          Object.keys(searchObjects).forEach(function (keyItem) {
            if (undefined !== car[keyItem] && car.status === 'available' && car[keyItem] === searchObjects[keyItem] && !arrOfSearch.includes(car)) {
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


        _db["default"].cars.map(function (car) {
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
            field: searchFields
          });
          return false;
        }

        res.status(200).send({
          status: 200,
          success: 'true',
          data: arrOfSearch
        });
        return false;
      } // If status=available not specified, search falls back to admin's view all (sold and available)
      // admin.viewAll(req, res);


      _admin["default"].viewAll(req, res);
    }
  }]);

  return Viewer;
}();

var _default = Viewer;
exports["default"] = _default;