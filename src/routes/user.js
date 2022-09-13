const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

router.get('/stored/posts', userController.storedPosts);
router.get('/trash/posts', userController.trashPosts);

module.exports = router;