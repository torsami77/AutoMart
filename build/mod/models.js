"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = _interopRequireDefault(require("../mid/pg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable class-methods-use-this */
const createClause = (table, columns, valueHolders, values) => {
  return _pg.default.query(`INSERT INTO ${table} (${columns}) VALUES(${valueHolders}) RETURNING id`, values);
};

const retrieveClause = (selection, table, where) => {
  _pg.default.query(`SELECT ${selection} FROM ${table} WHERE ${where}`).then(res => {
    console.log(res);

    _pg.default.end();
  }).catch(err => {
    console.log(err);

    _pg.default.end();
  });
};

var _default = {
  createClause,
  retrieveClause
};
exports.default = _default;