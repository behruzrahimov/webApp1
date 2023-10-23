import { describe, it, expect, test } from "vitest";
import axios from "axios";
describe("Balance Withdrawal Test", async function () {
  const baseURL = "http://localhost:7010/update-balance";
  const promises = [];
  for (let i = 0; i < 10000; i++) {
    promises.push(
      await axios
        .post(
          baseURL,
          { userId: 1, amount: 2 },
          {
            headers: { "Content-Type": "application/json" },
          },
        )
        .then((res) => {
          it("should process 5000 requests successfully", async function () {
            expect(res.status).toBe(200);
          });
        })
        .catch((e) => {
          it("should process 5000 requests not successfully", async function () {
            expect(e.response.status).toBe(400);
          });
        }),
    );
  }

  await Promise.all(promises);
});
