const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/creat', courseController.creat);
router.post('/store', courseController.store);
router.post('/handle-form-action', courseController.handleFormActions);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);
router.get('/:slug', courseController.show);
router.get('/', courseController.show);

module.exports = router;
