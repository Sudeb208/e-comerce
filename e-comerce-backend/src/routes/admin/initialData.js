const express = require('express');
const { initialData } = require('../../contorls/admin/initialDataColtroller');

const router = express.Router();

router.get('/initialData', initialData);

// signup user

module.exports = router;
