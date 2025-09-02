import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createProject);

router.get("/", authMiddleware, getProjects);

router.get("/:projectId", authMiddleware, getProjectById);

router.put("/:projectId", authMiddleware, updateProject);

router.delete("/:projectId", authMiddleware, deleteProject);

export default router;
