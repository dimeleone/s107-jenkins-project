import { Request, Response } from "express";
import TaskRepository from "../repositories/TaskRepository";

export default class TaskController {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async getAllTasks(req: Request, res: Response) {
    const tasks = await this.taskRepository.getAllTasks();
    return res.json(tasks);
  }

  async getTaskById(req: Request, res: Response) {
    const taskId = req.params.id;

    const task = await this.taskRepository.getTaskById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json(task);
  }

  async createTask(req: Request, res: Response) {
    const task = req.body;
    const createdTask = await this.taskRepository.createTask(task);
    return res.status(201).json(createdTask);
  }

  async updateTask(req: Request, res: Response) {
    const taskId = req.params.id;
    const updatedTask = req.body;

    const result = await this.taskRepository.updateTask(taskId, updatedTask);

    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json(result);
  }

  async deleteTask(req: Request, res: Response) {
    const taskId = req.params.id;

    const result = await this.taskRepository.deleteTask(taskId);

    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(204).json();
  }
}
