import mongoose from "mongoose";
import request from "supertest";
import app from "../../../src/app";
import { Task } from "../../../src/models/Task";

describe("Test - Delete Task", () => {
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

  it("sould delete a task", async () => {
    const res = await request(app).delete(`${TASK_ENDPOINT}/${createdTask.id}`);

    expect(res.status).toBe(204);
  });

  it("should return 404 if task is not found", async () => {
    const invalidId = new mongoose.Types.ObjectId().toString();
    const res = await request(app).delete(`${TASK_ENDPOINT}/${invalidId}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Task not found");
  });
});
