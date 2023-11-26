import mongoose from "mongoose";
import request from "supertest";
import app from "../../../src/app";

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Log", () => {
  const TASK_ENDPOINT = "/api/task";
  const LOG_ENDPOINT = "/api/log";

  it("should return 500 and save the logs when deleting a task using id that deos not have the mongodb format", async () => {
    const res = await request(app).delete(`${TASK_ENDPOINT}/123`);

    expect(res.status).toBe(500);
    expect(res.body.message).toBeDefined();

    let logs;

    for (let i = 0; i < 10; i++) {
      logs = await request(app).get(LOG_ENDPOINT);
      if (logs.body.length > 0) break;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    expect(logs?.status).toBe(200);
    expect(logs?.body.length).toBeGreaterThanOrEqual(1);
  });
});
