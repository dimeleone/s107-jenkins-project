const { Client } = require("pg");

export default class PostgresDbConnection {
  static async connect() {
    const client = new Client({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE,
      password: process.env.POSTGRES_PASSWORD,
      port: 5432,
    });

    client
      .connect()
      .then(() => {
        this.createLogTable(client);
      })
      .catch((error: Error) => {
        console.error("Error connecting to PostgreSQL", error);
        client.end();
      });
  }

  static async createLogTable(client: any) {
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS logs (
          id SERIAL PRIMARY KEY,
          message TEXT,
          timestamp TIMESTAMP DEFAULT NOW()
        )
      `);
    } catch (error) {
      console.error("Error creating log table:", error);
    } finally {
      client.end();
    }
  }
}
