import mongoose from "mongoose";
import request from "supertest";
import app from "../../../src/app";
import { Task } from "../../../src/models/Task";

afterAll(async () => {
  await mongoose.connection.close()
})

describe("Test - Update Task", () => {
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

  it("should update a task with all fields", async () => {
    const updatedTask = {
      title: "Updated Test Task",
      description: "This task has been updated",
      completed: true,
    };

    const res = await request(app)
      .patch(`${TASK_ENDPOINT}/${createdTask.id}`)
      .send(updatedTask);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated Test Task");
    expect(res.body.description).toBe("This task has been updated");
    expect(res.body.completed).toBe(true);
  });

  it("should update a task with only title", async () => {
    const updatedTask = {
      title: "Updated Test Task",
    };

    const res = await request(app)
      .patch(`${TASK_ENDPOINT}/${createdTask.id}`)
      .send(updatedTask);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated Test Task");
    expect(res.body.description).toBe(createdTask.description);
    expect(res.body.completed).toBe(createdTask.completed);
  });

  it("should update a task with only description", async () => {
    const updatedTask = {
      description: "This task has been updated",
    };

    const res = await request(app)
      .patch(`${TASK_ENDPOINT}/${createdTask.id}`)
      .send(updatedTask);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe(createdTask.title);
    expect(res.body.description).toBe("This task has been updated");
    expect(res.body.completed).toBe(createdTask.completed);
  });

  it("should update a task with only completed", async () => {
    const updatedTask = {
      completed: true,
    };

    const res = await request(app)
      .patch(`${TASK_ENDPOINT}/${createdTask.id}`)
      .send(updatedTask);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe(createdTask.title);
    expect(res.body.description).toBe(createdTask.description);
    expect(res.body.completed).toBe(true);
  });

  it("should return 404 if task is not found", async () => {
    const invalidId = new mongoose.Types.ObjectId().toString();
    const updatedTask = {
      title: "Updated Test Task",
      description: "This task has been updated",
      completed: true,
    };

    const res = await request(app)
      .patch(`${TASK_ENDPOINT}/${invalidId}`)
      .send(updatedTask);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Task not found");
  });
});
