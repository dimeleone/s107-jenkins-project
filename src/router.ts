import { Router } from "express";
import TaskController from "./controllers/TaskController";
import LogController from "./controllers/LogController";

const router = Router();
const taskController = new TaskController();
const logController = new LogController();

router.get("/task", taskController.getAllTasks.bind(taskController));
router.get("/task/:id", taskController.getTaskById.bind(taskController));
router.post("/task", taskController.createTask.bind(taskController));
router.patch("/task/:id", taskController.updateTask.bind(taskController));
router.delete("/task/:id", taskController.deleteTask.bind(taskController));

router.get("/log", logController.getAllLogs.bind(logController));

export default router;
