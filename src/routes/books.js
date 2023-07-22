const express = require('express');
const router = express.Router();
const bookController = require('../app/controllers/BookController');
const checkPermision = require('../middleware/checkPermison');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/img'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExtension = path.extname(file.originalname);
      const fileName = `${uniqueSuffix}${fileExtension}`;
      cb(null, fileName);
    },
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb('Error: Only image files (jpeg|jpg|png|gif) are allowed!');
    },
  });

router.get('/create', checkPermision.checkPermision, bookController.create);
router.post('/store', upload.single('image'), bookController.store);
router.get('/:id/edit', checkPermision.checkPermision, bookController.edit);
router.put('/:id', checkPermision.checkPermision, bookController.update);
router.delete('/:id', checkPermision.checkPermision, bookController.destroy);
router.get('/:slug', bookController.show);

router.post('/search', bookController.search);
router.post('/:slug', bookController.comment);

module.exports = router;
