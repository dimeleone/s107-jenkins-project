import request from "supertest";
import app from "../../../src/app";

describe("Test - Create Task", () => {
  const TASK_ENDPOINT = "/api/task";

  it("should create a new task", async () => {
    const newTask = {
      title: "Test Task",
      description: "This is a test task",
    };

    const res = await request(app).post(TASK_ENDPOINT).send(newTask);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Task");
    expect(res.body.description).toBe("This is a test task");
    expect(res.body.completed).toBe(false);
  });
});
