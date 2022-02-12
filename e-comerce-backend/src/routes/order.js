const router = require('express').Router();

const { requireSingin, adminMidleware } = require('../common-middleware/common-middleware');
const { addOrder, getOrders, getOrder } = require('../contorls/orderController');

router.post('/addOrder', requireSingin, addOrder);
router.get('/getOrders', requireSingin, adminMidleware, getOrders);
router.post('/getOrder', requireSingin, adminMidleware, getOrder);

module.exports = router;
