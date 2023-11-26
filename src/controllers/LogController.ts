import { Request, Response } from "express";
import LogRepository from "../repositories/LogRespository";

export default class TaskController {
  private logRepository: LogRepository;

  constructor() {
    this.logRepository = new LogRepository();
  }

  async getAllLogs(req: Request, res: Response) {
    const logs = await this.logRepository.getAll();
    return res.json(logs);
  }
}
