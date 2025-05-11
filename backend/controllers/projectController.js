const Project = require('../models/ProjectModel');
const mongoose = require('mongoose');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid project ID" });
  }

  try {
    const project = await Project.findOne({ _id: id, userId: req.user.id });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createProject = async (req, res) => {
  const { title, description, templateId } = req.body;

  try {
    const newProject = new Project({
      title,
      description,
      templateId,
      userId: req.user.id
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, templateId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid project ID" });
  }

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, description, templateId },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid project ID" });
  }

  try {
    const deletedProject = await Project.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
