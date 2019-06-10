"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

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

var employJwt = function employJwt(req, res) {
  var authorization = req.headers.authorization;

  try {
    var decoded = _jsonwebtoken["default"].verify(authorization, process.env.SECRET_KEY);

    req.userData = decoded;
  } catch (error) {
    return res.status(403).send({
      status: 403,
      error: 'Unauthorised User!',
      success: 'false'
    });
  }

  return false;
};

var Admin =
/*#__PURE__*/
function () {
  function Admin() {
    _classCallCheck(this, Admin);
  }

  _createClass(Admin, null, [{
    key: "viewAll",
    value: function viewAll(req, res) {
      employJwt(req, res);
      var checkAdmin = 0;

      _db["default"].users.map(function (user) {
        if (user.id === req.userData.id && user.is_admin === true) {
          checkAdmin = 1;
        }

        return false;
      });

      if (checkAdmin === 1) {
        return res.status(200).send({
          status: 200,
          data: _db["default"].cars,
          success: 'true'
        }); // eslint-disable-next-line no-else-return
      } else {
        return res.status(403).send({
          status: 403,
          error: 'You need Admin priviledges to view this set of data!',
          success: 'false'
        });
      }
    }
  }, {
    key: "delete",
    value: function _delete(req, res) {
      employJwt(req, res);

      if (!req.params.carId || isNaN(parseInt(req.params.carId, 10))) {
        return res.status(401).send({
          status: 401,
          error: 'Please provide a valid Ad reference!',
          success: 'false',
          field: 'order'
        });
      }

      var isAdmin = _db["default"].users.find(function (user) {
        return user.id === req.userData.id && user.is_admin === true;
      });

      if (isAdmin) {
        var counter = _db["default"].cars.findIndex(function (car) {
          return car.id === parseInt(req.params.carId, 10);
        });

        var searchedAd = _db["default"].cars.find(function (car) {
          return car.id === parseInt(req.params.carId, 10);
        });

        if (searchedAd) {
          _db["default"].cars.splice(counter, 1);

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

      } else {
        return res.status(403).send({
          status: 403,
          error: 'You need Admin priviledges to delete this Ad',
          success: 'false'
        });
      }
    }
  }]);

  return Admin;
}();

var _default = Admin;
exports["default"] = _default;