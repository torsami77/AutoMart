"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = _interopRequireDefault(require("../mid/pg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable class-methods-use-this */
const createClause = (table, columns, valueHolders, values) => _pg.default.query(`INSERT INTO ${table} (${columns}) VALUES(${valueHolders}) RETURNING id`, values);

const retrieveClause = (selection, table, where, values) => _pg.default.query(`SELECT ${selection} FROM ${table} WHERE ${where}`, values);

const updateClause = (table, set, where, values) => _pg.default.query(`UPDATE ${table} SET ${set} WHERE ${where}', ${values}`);

const deleteClause = (table, where, values) => _pg.default.query(`DELETE FROM ${table} WHERE ${where}, ${values}`);

var _default = {
  createClause,
  retrieveClause,
  updateClause,
  deleteClause
};
exports.default = _default;