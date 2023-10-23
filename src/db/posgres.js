import pkg from "pg";
const { Client } = pkg;

class Postgres {
  client = new Client({
    user: "shoh",
    host: "localhost",
    database: "postgres",
    password: "shoh!",
    port: 5432,
  });

  async connect() {
    try {
      await this.client.connect();
    } catch (error) {
      console.error("Error connecting to db:", error);
    }
  }

  async disconnect() {
    try {
      await this.client.end();
    } catch (error) {
      console.error("Error disconnecting from db:", error);
    }
  }

  async tableExists(tableName) {
    try {
      const query = {
        text: `
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_name = $1
        );
      `,
        values: [tableName],
      };

      const result = await this.client.query(query);
      return result.rows[0].exists;
    } catch (error) {
      return false;
    }
  }

  async getUserByUsername(username) {
    try {
      const query = {
        text: 'SELECT * FROM "users" WHERE username = $1',
        values: [username],
      };
      const { rows } = await this.client.query(query);
      if (rows.length === 0) {
        return null;
      } else {
        return rows[0];
      }
    } catch (error) {
      return null;
    }
  }

  async getUserById(id) {
    try {
      const query = {
        text: 'SELECT * FROM "users" WHERE id = $1',
        values: [id],
      };
      const { rows } = await this.client.query(query);
      if (rows.length === 0) {
        return null;
      } else {
        return rows[0];
      }
    } catch (error) {
      return null;
    }
  }

  async addUser(username, balance) {
    const exist = await this.tableExists("users");

    if (exist) {
      const existingUser = await this.getUserByUsername(username);

      if (existingUser) {
        return existingUser;
      }

      try {
        const query = {
          text: 'INSERT INTO "users" (username, balance) VALUES ($1, $2) RETURNING *',
          values: [username, balance],
        };
        const { rows } = await this.client.query(query);
        return rows[0];
      } catch (error) {
        console.error("Error adding user:", error);
        return null;
      }
    } else {
      try {
        const createTableQuery = `CREATE TABLE IF NOT EXISTS Users (
          id serial PRIMARY KEY,
          username VARCHAR(50) not null,
          balance NUMERIC(10, 2), -- NUMERIC with precision 10 and scale 2
          created_at TIMESTAMPTZ default NOW()
        )`;

        await this.client.query(createTableQuery, (err, res) => {
          if (err) {
            console.error("Error creating table:", err);
          }
        });

        const query = {
          text: 'INSERT INTO "users" (username, balance) VALUES ($1, $2) RETURNING *',
          values: [username, balance],
        };

        const { rows } = await this.client.query(query);
        return rows[0];
      } catch (error) {
        console.error("Error adding user:", error);
        return null;
      }
    }
  }
}

export const postgres = new Postgres();
