import Task from "../models/Task.js";
import Project from "../models/Project.js";


export const createTask = async (req, res) => {
  try {
    const { projectId } = req.params; 
    const { title, description, status, priority, dueDate, tags, attachments } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Projet non trouvé" });

    const newTask = new Task({
      projectId,
      title,
      description,
      status,
      priority,
      dueDate,
      tags,
      attachments,
      createdBy: req.user.id, 
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la tâche", error });
  }
};


export const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ projectId }).populate("createdBy", "username email");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des tâches", error });
  }
};


export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).populate("createdBy", "username email");

    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la tâche", error });
  }
};


export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });

    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la tâche", error });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);

    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    res.json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la tâche", error });
  }
};
