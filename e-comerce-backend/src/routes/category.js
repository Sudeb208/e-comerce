/* eslint-disable consistent-return */
const express = require('express');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const { requireSingin, adminMidleware } = require('../common-middleware/common-middleware');

const {
  addCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require('../contorls/categoryController');

const router = express.Router();

const storage = multer.diskStorage({
  destination(_req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename(req, file, cb) {
    cb(null, `${shortid.generate()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/category/create', requireSingin, adminMidleware, upload.single('categoryImage'), addCategory);
router.post('/category/update', upload.single('categoryImage'), updateCategories);
router.post('/category/delete', deleteCategories);
router.get('/category', getCategories);

module.exports = router;
