const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

router.get('/:id/edit', userController.edit);
router.delete('/:id', userController.destroy);
router.get('/:id/edit', userController.edit);
router.put('/:id', userController.update);
module.exports = router;
