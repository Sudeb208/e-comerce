const express = require('express');
const multer = require('multer');
const path = require('path');
const shortid = require('shortid');
const { requireSingin, adminMidleware } = require('../../common-middleware/common-middleware');

const { createPage, getPage } = require('../../contorls/PageController');

const router = express.Router();
const storage = multer.diskStorage({
  destination(_req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), '../uploads'));
  },
  filename(req, file, cb) {
    cb(null, `${shortid.generate()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/page/create', requireSingin, adminMidleware, upload.fields([
  { name: 'banners' }, { name: 'products' },
]), createPage);

router.get('/page/:category/:type', getPage);

module.exports = router;
