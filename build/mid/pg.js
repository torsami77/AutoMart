"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

let pgCredentials;

if (process.env.NODE_ENV === 'development') {
  pgCredentials = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT
  };
} else if (process.env.NODE_ENV === 'stage') {
  pgCredentials = {
    user: process.env.PG_STAGE_USER,
    password: process.env.PG_STAGE_PASSWORD,
    database: process.env.PG_STAGE_DATABASE,
    host: process.env.PG_STAGE_HOST,
    port: process.env.PG_STAGE_PORT,
    ssl: true
  };
} else if (process.env.NODE_ENV === 'heroku') {
  pgCredentials = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  };
}

const pool = new _pg.default.Pool(pgCredentials);
var _default = pool;
exports.default = _default;