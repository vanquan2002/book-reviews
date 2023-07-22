const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController');
const checkPermision = require('../middleware/checkPermison');

router.get('/', adminController.home);
router.get('/statistical',adminController.index);

router.get('/stored/books', checkPermision.checkPermision, adminController.storedBook);
router.get('/stored/users', checkPermision.checkPermision, adminController.storedUser);
router.get('/stored/comments', checkPermision.checkPermision, adminController.storedComment);

module.exports = router;
