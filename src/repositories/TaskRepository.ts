import { Task } from "../models/Task";
import TaskDb from "../db/TaskDb";

export default class TaskRepository {
  private taskDb: TaskDb;

  constructor() {
    this.taskDb = new TaskDb();
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskDb.getTasks();
  }

  async getTaskById(id: string): Promise<Task | undefined> {
    return this.taskDb.getTask(parseInt(id));
  }

  async createTask(task: Task): Promise<Task> {
    return this.taskDb.addTask(task.title, task.description);
  }

  async updateTask(id: string, task: Task): Promise<Task | undefined> {
    return this.taskDb.updateTask(parseInt(id), task);
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.taskDb.deleteTask(parseInt(id));
  }
}
