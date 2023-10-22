// User.js
import { DataTypes } from "sequelize";
import { connection } from "../db/posgres.js";

const User = connection.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});

export default User;
