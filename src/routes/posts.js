const express = require('express');
const router = express.Router();
const postController = require('../app/controllers/PostController');

router.get('/create', postController.create);
router.post('/store', postController.store);
router.get('/:id/edit', postController.edit);
router.post('/submit-select-option', postController.submitSelectOption);
router.put('/:id', postController.update);
router.patch('/:id/restore', postController.restore);
router.delete('/:id', postController.delete);
router.delete('/:id/destroy', postController.destroy);
router.get('/:slug', postController.show);

module.exports = router;