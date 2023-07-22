const express = require('express');
const router = express.Router();
const commentController = require('../app/controllers/CommentController');

router.delete('/:id', commentController.destroy);

module.exports = router;
