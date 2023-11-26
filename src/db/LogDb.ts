import { Pool } from 'pg';

class LogDb {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE,
      password: process.env.POSTGRES_PASSWORD,
      port: 5432,
    });
  }

  async insertLog(message: string): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('INSERT INTO logs (message) VALUES ($1)', [message]);
    } finally {
      client.release();
    }
  }

  async getAllLogs(): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM logs');
      return result.rows;
    } finally {
      client.release();
    }
  }
}

export default LogDb;
