import { Task } from "../models/Task";
import { TaskModel } from "../db/TaskDb";

export default class TaskRepository {
  async getAllTasks(): Promise<Task[]> {
    return TaskModel.find();
  }

  async getTaskById(id: string): Promise<Task | null> {
    return TaskModel.findById(id);
  }

  async createTask(task: Task): Promise<Task> {
    return TaskModel.create(task);
  }

  async updateTask(id: string, task: Task): Promise<Task | null> {
    return TaskModel.findByIdAndUpdate(id, task, { new: true });
  }

  async deleteTask(id: string): Promise<Task | null> {
    return TaskModel.findByIdAndDelete(id).exec()
  }
}
