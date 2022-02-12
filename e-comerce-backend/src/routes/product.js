const express = require('express');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const { requireSingin, adminMidleware } = require('../common-middleware/common-middleware');
const {
  createProduct,
  getProduct,
  getProductByCategory,
  getProductById,
} = require('../contorls/productController');

// const { addCategory, getCategories } = require('../contorls/categoryController');

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

router.post(
  '/product/create',
  requireSingin,
  adminMidleware,
  upload.array('productPicture'),
  createProduct,
);
router.get('/product', getProduct);
router.get('/product/:category', getProductByCategory);
router.get('/products/:id', getProductById);

module.exports = router;
