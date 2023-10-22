import express from "express";
import { AppConfig } from "./app.config.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(AppConfig.port, () => {
  console.log(`Server started at ${AppConfig.domain}`);
});
