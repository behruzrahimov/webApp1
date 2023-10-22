import { Client } from "pg";

export class Postgres {
  constructor() {
    this.client = new Client({
      user: "shoh",
      host: "localhost",
      database: "postgres",
      password: "1234",
      port: 5432,
    });
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Connected to PostgresSQL");
    } catch (error) {
      console.error("Error connecting to PostgresSQL:", error);
    }
  }

  async disconnect() {
    try {
      await this.client.end();
      console.log("Disconnected from PostgresSQL");
    } catch (error) {
      console.error("Error disconnecting from PostgresSQL:", error);
    }
  }

  async getUserByUsername(username) {
    try {
      const query = {
        text: 'SELECT * FROM "User" WHERE username = $1',
        values: [username],
      };
      const { rows } = await this.client.query(query);
      if (rows.length === 0) {
        console.log(`User '${username}' not found.`);
        return null;
      } else {
        console.log(`User '${username}' found.`);
        return rows[0];
      }
    } catch (error) {
      console.error("Error retrieving user by username:", error);
      return null;
    }
  }

  async addUser(username, balance) {
    const existingUser = await this.getUserByUsername(username);
    if (existingUser) {
      return existingUser;
    }
    try {
      const query = {
        text: 'INSERT INTO "User" (username, balance) VALUES ($1, $2) RETURNING *',
        values: [username, balance],
      };

      const { rows } = await this.client.query(query);
      console.log(`User '${username}' added.`);
      return rows[0];
    } catch (error) {
      console.error("Error adding user:", error);
      return null;
    }
  }
}
