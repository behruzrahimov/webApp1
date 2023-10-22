import { connection } from "./posgres.js";

export async function tableExists(tableName) {
  try {
    const result = await connection.getQueryInterface().showAllTables();

    const tableNames = result.map((table) => table.name);

    if (tableNames.includes(tableName)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking table existence:", error);
  }
}
