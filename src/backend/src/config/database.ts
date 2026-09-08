import pg from 'pg';
import { env } from './env.js';

const { Pool } = pg;

let pool: pg.Pool | null = null;

export const getDbPool = (): pg.Pool => {
  if (!pool) {
    if (!env.DATABASE_URL) {
      throw new Error(
        'DATABASE_URL is not configured. Please define it in your .env or Docker environment.'
      );
    }

    pool = new Pool({
      connectionString: env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pool.on('error', (err) => {
      console.error('⚠️ Unexpected error on idle PostgreSQL client:', err);
    });
  }

  return pool;
};

export interface DatabaseTestResult {
  connected: boolean;
  latencyMs: number;
  database?: string;
  serverTime?: string;
  postgresVersion?: string;
  tables?: string[];
  error?: string;
}

export const testDatabaseConnection = async (): Promise<DatabaseTestResult> => {
  if (!env.DATABASE_URL) {
    return {
      connected: false,
      latencyMs: 0,
      error: 'DATABASE_URL environment variable is not defined',
    };
  }

  const startTime = Date.now();

  try {
    const currentPool = getDbPool();

    // Query server time, database name, and postgres version
    const infoResult = await currentPool.query(`
      SELECT 
        current_database() AS database,
        NOW() AS server_time,
        version() AS version;
    `);

    // Query existing public tables
    const tablesResult = await currentPool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name ASC;
    `);

    const latencyMs = Date.now() - startTime;
    const row = infoResult.rows[0];
    const tables = tablesResult.rows.map((r: { table_name: string }) => r.table_name);

    return {
      connected: true,
      latencyMs,
      database: row?.database,
      serverTime: row?.server_time,
      postgresVersion: row?.version,
      tables,
    };
  } catch (error) {
    const latencyMs = Date.now() - startTime;
    const message = error instanceof Error ? error.message : 'Unknown database error';

    return {
      connected: false,
      latencyMs,
      error: message,
    };
  }
};

export const closeDbPool = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('✅ PostgreSQL connection pool closed');
  }
};
