import { postgres } from "../db/posgres.js";

export async function updateBalance(request, response) {
  const { userId, amount } = request.body;

  if (!userId || !amount) {
    return response
      .status(400)
      .json({ error: "userId and amount are required." });
  }
  try {
    const existingUser = await postgres.getUserById(userId);
    if (!existingUser) {
      console.log(`User '${userId}' not found.`);
      return null;
    }
    if (existingUser.balance >= 2) {
      const newBalance = existingUser.balance - 2;
      const query = {
        text: 'UPDATE "users" SET balance = $1 WHERE id = $2 RETURNING *',
        values: [newBalance, userId],
      };
      const { rows } = await postgres.client.query(query);
      console.log(rows);
      response.json({
        message: "Balance updated successfully.",
        user: rows,
      });
    } else {
      response
        .status(400)
        .json({ error: "Insufficient funds on the balance." });
    }
  } catch (error) {
    console.error("Error updating user balance:", error);
    return null;
  }
}
