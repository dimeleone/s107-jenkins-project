import { Task } from "../models/Task";

export default class TaskDb {
  private tasks: Task[];
  private nextId: number;

  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  public addTask(title: string, description: string): Task {
    const task: Task = {
      id: this.nextId++,
      title,
      description,
      completed: false,
    };
    this.tasks.push(task);
    return task;
  }

  public getTask(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  public getTasks(): Task[] {
    return this.tasks;
  }

  public updateTask(id: number, updates: Partial<Task>): Task | undefined {
    const task = this.getTask(id);
    if (task) {
      Object.assign(task, updates);
    }
    return task;
  }

  public deleteTask(id: number): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }
}
