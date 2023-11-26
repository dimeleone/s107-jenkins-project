import { Request, Response } from "express";
import TaskRepository from "../repositories/TaskRepository";
import LogRepository from "../repositories/LogRespository";

export default class TaskController {
  private taskRepository: TaskRepository;
  private logRepository: LogRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
    this.logRepository = new LogRepository();
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await this.taskRepository.getAllTasks();
      return res.json(tasks);
    } catch (err) {
      const error = err as Error;
      this.logRepository.insert(error.message);
      return res.status(500).json({ message: error.message });
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const taskId = req.params.id;

      const task = await this.taskRepository.getTaskById(taskId);

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.json(task);
    } catch (err) {
      const error = err as Error;
      this.logRepository.insert(error.message);
      return res.status(500).json({ message: error.message });
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const task = req.body;
      const createdTask = await this.taskRepository.createTask(task);
      return res.status(201).json(createdTask);
    } catch (err) {
      const error = err as Error;
      this.logRepository.insert(error.message);
      return res.status(500).json({ message: error.message });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const taskId = req.params.id;
      const updatedTask = req.body;

      const result = await this.taskRepository.updateTask(taskId, updatedTask);

      if (!result) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.json(result);
    } catch (err) {
      const error = err as Error;
      this.logRepository.insert(error.message);
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const taskId = req.params.id;

      const result = await this.taskRepository.deleteTask(taskId);

      if (!result) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(204).json();
    } catch (err) {
      const error = err as Error;
      this.logRepository.insert(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
}
