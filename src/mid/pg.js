import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let pgCredentials;
if (process.env.NODE_ENV === 'development') {
  pgCredentials = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
  };
} else if (process.env.NODE_ENV === 'stage') {
  pgCredentials = {
    user: process.env.PG_STAGE_USER,
    password: process.env.PG_STAGE_PASSWORD,
    database: process.env.PG_STAGE_DATABASE,
    host: process.env.PG_STAGE_HOST,
    port: process.env.PG_STAGE_PORT,
    ssl: true,
  };
} else if (process.env.NODE_ENV === 'heroku') {
  pgCredentials = {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  };
}

const pool = new pg.Pool(pgCredentials);

export default pool;
