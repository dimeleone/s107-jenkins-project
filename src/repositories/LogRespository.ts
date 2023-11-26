import LogDb from '../db/LogDb';

export default class LogRepository {
  private logDb: LogDb;

  constructor() {
    this.logDb = new LogDb();
  }
  async insert(message: string): Promise<void> {
    await this.logDb.insertLog(message);
  }

  async getAll(): Promise<any> {
    return await this.logDb.getAllLogs();
  }
}