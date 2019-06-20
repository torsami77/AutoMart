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
    connectionString: 'postgres://pnrenggg:Vem3XKFRoaq49sWFs4Uno6tdKPg8WNGV@raja.db.elephantsql.com:5432/pnrenggg',
  };
}

const pool = new pg.Pool(pgCredentials);

export default pool;
