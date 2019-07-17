"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _pg = _interopRequireDefault(require("../mid/pg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */

/* eslint-disable no-restricted-globals */
const app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.text());
app.use(_bodyParser.default.json({
  type: 'application/json'
}));

class Buyer {
  static order(req, res) {
    if (isNaN(parseFloat(req.body.amount))) {
      res.status(400).send({
        status: 400,
        error: 'Please provide a valid price value!',
        success: 'false',
        field: 'amount'
      });
      return false;
    }

    if (isNaN(parseInt(req.body.car_id, 10))) {
      res.status(400).send({
        status: 400,
        error: 'Please provide a valid order reference!',
        success: 'false',
        field: 'car_id'
      });
      return false;
    }

    const carId = req.body.car_id;
    const newOrder = {}; // db.cars.map((car) => {

    _pg.default.query('SELECT price FROM cars WHERE id = $1', [carId], (err, data) => {
      if (data && data.rows[0]) {
        newOrder.buyer = req.userData.id;
        newOrder.car_id = carId;
        newOrder.created_on = new Date();
        newOrder.amount = [parseFloat(req.body.amount)];
        newOrder.status = 'pending'; // eslint-disable-next-line prefer-destructuring

        newOrder.price = data.rows[0].price;

        _pg.default.query(`INSERT INTO orders (buyer, car_id, created_on, amount, status, price) 
            VALUES($1, $2, $3, $4, $5, $6) RETURNING id`, // eslint-disable-next-line max-len
        [req.userData.id, newOrder.car_id, newOrder.created_on, newOrder.amount, newOrder.status, newOrder.price], (_error, resulted) => {
          if (resulted && resulted.rows[0]) {
            return res.status(201).send({
              status: 201,
              data: {
                id: resulted.rows[0].id,
                car_id: newOrder.car_id,
                created_on: newOrder.created_on,
                status: newOrder.status,
                price: parseFloat(newOrder.price),
                price_offered: newOrder.amount[newOrder.amount.length - 1],
                success: 'true',
                message: 'Your Order has been placed successfully!',
                field: 'order'
              }
            }); // eslint-disable-next-line no-else-return
          }

          return false;
        });
      } else {
        return res.status(404).send({
          status: 404,
          error: 'Ad not found, Please provide actual car Id!',
          success: 'false',
          field: 'car_id'
        });
      }

      return false;
    });

    return false;
  }

  static updateOrder(req, res) {
    if (isNaN(parseInt(req.params.orderId, 10))) {
      return res.status(400).send({
        status: 400,
        error: 'Please provide a valid order reference!',
        success: 'false',
        field: 'order'
      });
    }

    const {
      orderId
    } = req.params;

    if (isNaN(parseFloat(req.body.price))) {
      return res.status(400).send({
        status: 400,
        error: 'Please provide a valid price value!',
        success: 'false',
        field: 'amount'
      });
    }

    _pg.default.query('SELECT status, car_id, amount FROM orders WHERE id = $1', [orderId], (_err, data) => {
      if (data && data.rows[0]) {
        if (data.rows[0].status === 'pending') {
          const amountArray = data.rows[0].amount;
          const carId = data.rows[0].car_id;
          const {
            status
          } = data.rows[0]; // eslint-disable-next-line max-len

          amountArray.push(parseFloat(req.body.price));
          const new_price_offered = amountArray[amountArray.length - 1];
          const old_price_offered = amountArray[amountArray.length - 2];

          _pg.default.query('UPDATE orders SET amount = $1 WHERE id = $2', [amountArray, parseInt(orderId, 10)], // eslint-disable-next-line no-unused-vars
          (error, _resulted) => {
            if (!error) {
              return res.status(201).send({
                status: 201,
                data: {
                  id: parseInt(orderId, 10),
                  car_id: carId,
                  status,
                  old_price_offered: parseFloat(old_price_offered),
                  new_price_offered: parseFloat(new_price_offered),
                  success: 'true',
                  message: 'Your Order has been updated successfully!',
                  field: 'order'
                }
              });
            }

            return false;
          });
        } else {
          return res.status(403).send({
            status: 403,
            error: 'This Order cannot be updated anymore!',
            success: 'false',
            field: 'order'
          });
        }
      } else {
        return res.status(404).send({
          status: 404,
          error: 'Order not found!',
          success: 'false',
          field: 'order'
        });
      }

      return false;
    });

    return false;
  }
  /*
  static order(req, res) {
    const carId = req.body.car_id;
     if (isNaN(parseFloat(req.body.amount))) {
      res.status(400).send({
        status: 400,
        error: 'Please provide a valid price value!',
        success: 'false',
        field: 'amount',
      });
      return false;
    }
    if (isNaN(parseInt(carId, 10))) {
      res.status(400).send({
        status: 400,
        error: 'Please provide a valid order reference!',
        success: 'false',
        field: 'car_id',
      });
      return false;
    }
    const newOrder = {};
    let price;
    // db.cars.map((car) => {
     pool.query('SELECT price, orders FROM cars WHERE id = $1', [carId],
      (err, data) => {
        let ordersArray;
        if (typeof (data.rows[0]) !== 'undefined') {
          ordersArray = data.rows[0].orders;
          newOrder.id = ordersArray.length + 1;
          newOrder.buyer = req.userData.id;
          newOrder.car_id = carId;
          newOrder.amount = [parseFloat(req.body.amount)];
          newOrder.status = 'pending';
          newOrder.created_on = new Date();
          // eslint-disable-next-line prefer-destructuring
          price = data.rows[0].price;
          ordersArray.push(newOrder);
           pool.query('UPDATE cars SET orders = $1 WHERE id = $2', [ordersArray, carId],
            (_error, resulted) => {
              if (resulted) {
                return res.status(201).send({
                  status: 201,
                  data: {
                    id: newOrder.id,
                    car_id: newOrder.car_id,
                    created_on: newOrder.created_on,
                    status: newOrder.status,
                    price,
                    price_offered: newOrder.amount[newOrder.amount.length - 1],
                    success: 'true',
                    message: 'Your Order has been placed successfully!',
                    field: 'order',
                  },
                });
              // eslint-disable-next-line no-else-return
              }
              return false;
            });
        } else {
          return res.status(404).send({
            status: 404,
            error: 'Ad not found, Please provide actual car Id!',
            success: 'false',
            field: 'car_id',
          });
        }
        return false;
      });
    return false;
  }
   static updateOrder(req, res) {
    const carId = req.body.car_id;
    if (isNaN(parseInt(req.params.orderId, 10))) {
      return res.status(400).send({
        status: 400,
        error: 'Please provide a valid order reference!',
        success: 'false',
        field: 'order',
      });
    }
    if (isNaN(parseFloat(req.body.price))) {
      return res.status(400).send({
        status: 400,
        error: 'Please provide a valid price value!',
        success: 'false',
        field: 'amount',
      });
    }
    if (isNaN(parseInt(carId, 10))) {
      return res.status(400).send({
        status: 400,
        error: 'Please provide a valid AD reference!',
        suceess: 'false',
        field: 'car_id',
      });
    }
     pool.query('SELECT price, orders FROM cars WHERE id = $1', [carId],
      (_err, data) => {
        if (data.rows[0]) {
          const ordersArray = data.rows[0].orders;
          // eslint-disable-next-line max-len
          let theOrder;
          let old_price_offered;
          let new_price_offered;
          ordersArray.map((order) => {
            const checkOrder = JSON.parse(order);
            if (checkOrder.buyer === req.userData.id && checkOrder.id === parseInt(req.params.orderId, 10)) {
              theOrder = checkOrder;
              theOrder.amount.push(parseFloat(req.body.price));
              old_price_offered = theOrder.amount[theOrder.amount.length - 1];
              new_price_offered = theOrder.amount[theOrder.amount.length - 2];
            }
            return false;
          });
           if (theOrder) {
            if (theOrder.status !== 'pending') {
              return res.status(403).send({
                status: 403,
                error: 'This Order cannot be updated anymore!',
                success: 'false',
                field: 'order',
              });
            // eslint-disable-next-line no-else-return
            } else {
              pool.query('UPDATE cars SET orders = $1 WHERE id = $2', [ordersArray, parseInt(carId, 10)],
                // eslint-disable-next-line no-unused-vars
                (error, _resulted) => {
                  if (!error) {
                    return res.status(201).send({
                      status: 201,
                      data: {
                        id: theOrder.id,
                        car_id: theOrder.car_id,
                        status: theOrder.status,
                        old_price_offered,
                        new_price_offered,
                        success: 'true',
                        message: 'Your Order has been updated successfully!',
                        field: 'order',
                      },
                    });
                  }
                  return false;
                });
            }
          } else {
            return res.status(404).send({
              status: 404,
              error: 'Order not found!',
              success: 'false',
              field: 'order',
            });
          }
        } else {
          return res.status(404).send({
            status: 404,
            error: 'Ad not found!',
            success: 'false',
            field: 'order',
          });
        }
        return false;
      });
    return false;
  }
  */


  static flag(req, res) {
    const carId = req.body.car_id;

    if (isNaN(parseInt(carId, 10))) {
      return res.status(400).send({
        status: 400,
        error: 'Please provide a valid Ad reference!',
        success: 'false',
        field: 'carId'
      });
    }

    if (!req.body.reason || req.body.reason === ' ') {
      return res.status(400).send({
        status: 400,
        error: 'Please indicate your reason for this red flag!',
        success: 'false',
        field: 'reason'
      });
    }

    if (!req.body.description || req.body.description === ' ') {
      return res.status(400).send({
        status: 400,
        error: 'Please enter description for your red flag!',
        success: 'false',
        field: 'description'
      });
    }

    const newFlag = {};

    _pg.default.query('SELECT flags FROM cars WHERE id = $1', [parseInt(carId, 10)], // eslint-disable-next-line no-unused-vars
    (error, resulted) => {
      if (resulted.rows[0]) {
        const flagsArray = resulted.rows[0].flags;
        newFlag.id = flagsArray.length + 1;
        newFlag.car_Id = carId;
        newFlag.reason = req.body.reason;
        newFlag.description = req.body.description;
        newFlag.created_on = new Date();
        flagsArray.push(newFlag);

        _pg.default.query('UPDATE cars SET flags = $1 WHERE id = $2', [flagsArray, parseInt(carId, 10)], // eslint-disable-next-line no-unused-vars
        (err, result) => {
          if (!err) {
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
            return res.status(500).send({
              status: 500,
              error: 'your request was not completed please try again!',
              success: 'false',
              field: 'flag'
            });
          }
        });
      } else {
        return res.status(404).send({
          status: 404,
          error: 'Ad not found!',
          success: 'false',
          field: 'flag'
        });
      }

      return false;
    });

    return false;
  }

}

var _default = Buyer;
exports.default = _default;