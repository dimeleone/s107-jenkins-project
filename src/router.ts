import { Router } from "express";
import TaskController from "./controllers/TaskController";

const router = Router();
const taskController = new TaskController();

router.get("/task", taskController.getAllTasks.bind(taskController));
router.get("/task/:id", taskController.getTaskById.bind(taskController));
router.post("/task", taskController.createTask.bind(taskController));
router.patch("/task/:id", taskController.updateTask.bind(taskController));
router.delete("/task/:id", taskController.deleteTask.bind(taskController));

export default router;
