import Project from "../models/Project.js";

export const createProject = async (req, res) => {
    try {
        const userId = req.user.id;

        const { projectTitle, projectDesc } = req.body;

        const newProject = new Project({
            title: projectTitle,
            description: projectDesc,
            owner: userId,
            members: [userId]
        });

        const project = await newProject.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du projet', error });
    }
};

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate("owner members", "username email");
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des projets', error });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate("owner members", "username email");
        if (!project) return res.status(404).json({ message: 'Projet non trouvé' });

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du projet', error });
    }
};

export const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.projectId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!project) return res.status(404).json({ message: 'Projet non trouvé' });

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du projet', error });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.projectId);
        if (!project) return res.status(404).json({ message: "Projet non trouvé" });

        res.json({ message: "Projet supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du projet', error });
    }
};
