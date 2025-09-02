import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/projects/:projectId/tasks", authMiddleware, createTask);

router.get("/projects/:projectId/tasks", authMiddleware, getTasksByProject);

router.get("/tasks/:taskId", authMiddleware, getTaskById);

router.put("/tasks/:taskId", authMiddleware, updateTask);

router.delete("/tasks/:taskId", authMiddleware, deleteTask);

export default router;
