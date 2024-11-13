import { Pool, QueryConfig, QueryResult } from 'pg';

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : undefined, // .env variable is string, change to number
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

async function connection(queryObject: QueryConfig): Promise<QueryResult> {
  try {
    const client = await pool.connect();
    const result = await client.query(queryObject);
    client.release(); // release client back to the pool
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export default connection;
