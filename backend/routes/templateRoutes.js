const express=require('express');
const router=express.Router();
const templateController= require("../controllers/templateController");
const authMiddleware= require("../middleware/auth");

router.use(authMiddleware);

router.get('/', templateController.getTemplates);
router.get('/:id', templateController.getTemplateById);
router.post('/', templateController.createTemplate);
router.put('/:id', templateController.updateTemplate);
router.delete('/:id', templateController.deleteTemplate);

module.exports = router;