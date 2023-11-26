import mongoose from "mongoose";
import request from "supertest";
import app from "../../../src/app";
import { Task } from "../../../src/models/Task";

afterAll(async () => {
  await mongoose.connection.close()
})

describe("Test - Get Task", () => {
  let createdTask: Task;
  const TASK_ENDPOINT = "/api/task";

  beforeEach(async () => {
    const newTask = {
      title: "Test Task",
      description: "This is a test task",
    };

    const res = await request(app).post(TASK_ENDPOINT).send(newTask);

    createdTask = res.body;
  });

  it("should get all tasks", async () => {
    const res = await request(app).get(TASK_ENDPOINT);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get a task by ID", async () => {
    const res = await request(app).get(`${TASK_ENDPOINT}/${createdTask.id}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdTask.id);
    expect(res.body.title).toBe(createdTask.title);
    expect(res.body.description).toBe(createdTask.description);
    expect(res.body.completed).toBe(createdTask.completed);
  });

  it("should return 404 if task is not found", async () => {
    const invalidId = new mongoose.Types.ObjectId().toString();
    const res = await request(app).get(`${TASK_ENDPOINT}/${invalidId}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Task not found");
  });
});
