import express from "express";
import { AppConfig } from "./app.config.js";
import { connection } from "../db/posgres.js";
import { createAndInsertUser } from "../db/create-user-table.js";

const app = express();

try {
  await connection.authenticate();
  await createAndInsertUser();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(AppConfig.port, () => {
  console.log(`Server started at ${AppConfig.domain}`);
});
