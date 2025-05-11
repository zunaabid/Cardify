const express = require('express');
const router = express.Router();
const projectController = require("../controllers/projectController");
const authMiddleware= require("../middleware/auth");

router.use(authMiddleware);

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
