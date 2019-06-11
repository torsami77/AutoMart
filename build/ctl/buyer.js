"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _db = _interopRequireDefault(require("../db/db"));

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

var Buyer =
/*#__PURE__*/
function () {
  function Buyer() {
    _classCallCheck(this, Buyer);
  }

  _createClass(Buyer, null, [{
    key: "order",
    value: function order(req, res) {
      if (isNaN(parseFloat(req.body.amount))) {
        res.status(401).send({
          status: 401,
          error: 'Please provide a valid price value!',
          success: 'false',
          field: 'amount'
        });
        return false;
      }

      if (isNaN(parseInt(req.body.carId, 10))) {
        res.status(401).send({
          status: 401,
          error: 'Please provide a valid order reference!',
          success: 'false',
          field: 'carId'
        });
        return false;
      }

      var newOrder = {};
      var price;

      _db["default"].cars.map(function (car) {
        if (car.id === parseInt(req.body.carId, 10)) {
          newOrder.id = car.orders.length + 1;
          newOrder.buyer = req.userData.id;
          newOrder.carId = req.body.carId;
          newOrder.amount = [parseFloat(req.body.amount)];
          newOrder.status = 'pending';
          newOrder.created_on = new Date();
          price = car.price;
          car.orders.push(newOrder);
        }

        return false;
      });

      if (newOrder.hasOwnProperty('id')) {
        res.status(201).send({
          status: 201,
          data: {
            id: newOrder.id,
            carId: newOrder.carId,
            created_on: newOrder.created_on,
            status: newOrder.status,
            price: price,
            price_offered: newOrder.amount[newOrder.amount.length - 1],
            success: 'true',
            message: 'Your Order has been placed successfully!',
            field: 'order'
          }
        });
        return false; // eslint-disable-next-line no-else-return
      } else {
        res.status(404).send({
          status: 404,
          error: 'Ad not found, Please provide actual car Id!',
          success: 'false',
          field: 'carId'
        });
        return false;
      }
    }
  }, {
    key: "updateOrder",
    value: function updateOrder(req, res) {
      if (isNaN(parseInt(req.params.orderId, 10))) {
        return res.status(401).send({
          status: 401,
          error: 'Please provide a valid order reference!',
          success: 'false',
          field: 'order'
        });
      }

      if (isNaN(parseFloat(req.body.amount))) {
        return res.status(401).send({
          status: 401,
          error: 'Please provide a valid price value!',
          success: 'false',
          field: 'car'
        });
      }

      if (isNaN(parseInt(req.body.carId, 10))) {
        return res.status(401).send({
          status: 401,
          error: 'Please provide a valid AD reference!',
          suceess: 'false',
          field: 'car'
        });
      }

      var checkOrder;
      var checkAd = 0;

      _db["default"].cars.map(function (car) {
        if (car.id === parseInt(req.body.carId, 10)) {
          checkAd = 1;
          car.orders.map(function (order) {
            checkAd = 2;

            if (order.id === parseInt(req.params.orderId, 10) && order.status === 'pending' && order.buyer === req.userData.id) {
              order.amount.push(parseFloat(req.body.amount));
              checkOrder = order; // eslint-disable-next-line no-else-return
            } else {
              checkAd = 4;
            }
          });
        }

        return false;
      });

      if (checkAd === 4) {
        res.status(401).send({
          status: 401,
          error: 'This Order cannot be updated anymore!',
          success: 'false',
          field: 'order'
        });
        return false;
      }

      if (undefined !== checkOrder) {
        return res.status(201).send({
          status: 201,
          data: {
            id: checkOrder.id,
            carId: checkOrder.carId,
            status: checkOrder.status,
            old_price_offered: checkOrder.amount[checkOrder.amount.length - 1],
            new_price_offered: checkOrder.amount[checkOrder.amount.length - 2],
            success: 'true',
            message: 'Your Order has been updated successfully!',
            field: 'order'
          }
        });
      }

      if (checkAd === 0) {
        res.status(404).send({
          status: 404,
          error: 'Ad not found!',
          success: 'false',
          field: 'order'
        });
        return false;
      }

      if (checkAd === 1) {
        res.status(404).send({
          status: 404,
          error: 'Order not found!',
          success: 'false',
          field: 'order'
        });
        return false;
      }

      return false;
    }
  }, {
    key: "flag",
    value: function flag(req, res) {
      if (isNaN(parseInt(req.body.carId, 10))) {
        return res.status(401).send({
          status: 401,
          error: 'Please provide a valid Ad reference!',
          success: 'false',
          field: 'carId'
        });
      }

      if (!req.body.reason || req.body.reason === ' ') {
        return res.status(401).send({
          status: 401,
          error: 'Please indicate your reason for this red flag!',
          success: 'false',
          field: 'reason'
        });
      }

      if (!req.body.description || req.body.description === ' ') {
        return res.status(401).send({
          status: 401,
          error: 'Please enter description for your red flag!',
          success: 'false',
          field: 'description'
        });
      }

      var newFlag = {};

      _db["default"].cars.map(function (car) {
        if (car.id === parseInt(req.body.carId, 10)) {
          newFlag.id = car.flags.length + 1;
          newFlag.car_Id = req.body.carId;
          newFlag.reason = req.body.reason;
          newFlag.description = req.body.description;
          newFlag.created_on = new Date();
          car.flags.push(newFlag);
        }

        return false;
      });

      if (newFlag.hasOwnProperty('id')) {
        return res.status(201).send({
          status: 201,
          data: {
            id: newFlag.id,
            car_Id: newFlag.car_Id,
            reason: newFlag.reason,
            description: newFlag.description,
            success: 'true',
            message: 'Red flag raised successfully!',
            field: 'flag'
          }
        }); // eslint-disable-next-line no-else-return
      } else {
        return res.status(404).send({
          status: 404,
          error: 'Ad not found!',
          success: 'false',
          field: 'flag'
        });
      }
    }
  }]);

  return Buyer;
}();

var _default = Buyer;
exports["default"] = _default;