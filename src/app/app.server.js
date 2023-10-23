import express from "express";
import { AppConfig } from "./app.config.js";
import { postgres } from "../db/posgres.js";
import { updateBalance } from "../resolver/update-balance.js";
await postgres.connect();
await postgres.addUser("shoh", 10000);
import * as cors from "cors";

const app = express();

app.use(express.json());

app.post("/update-balance", updateBalance);

app.listen(AppConfig.port, () => {
  console.log(`Server started at ${AppConfig.domain}`);
});
