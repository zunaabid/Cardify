const Template = require('../models/TemplateModel');
const mongoose = require('mongoose');

exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getTemplateById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid template ID" });
  }

  try {
    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json(template);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createTemplate = async (req, res) => {
  const { name, content } = req.body;

  try {
    const newTemplate = new Template({ name, content });
    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTemplate = async (req, res) => {
  const { id } = req.params;
  const { name, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid template ID" });
  }

  try {
    const updatedTemplate = await Template.findByIdAndUpdate(
      id,
      { name, content },
      { new: true }
    );

    if (!updatedTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json(updatedTemplate);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteTemplate = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid template ID" });
  }

  try {
    const deletedTemplate = await Template.findByIdAndDelete(id);

    if (!deletedTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json({ message: "Template deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
