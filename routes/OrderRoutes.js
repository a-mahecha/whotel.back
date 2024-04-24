var express = require('express');
var router = express.Router();

const orderController = require('../controllers/OrderController');
const checkAuth = require('../middleware/check-auth');

router.post("/createorder", checkAuth, orderController.order_i);
router.post("/createorderitem", checkAuth, orderController.order_item_i);
router.get("/list", checkAuth, orderController.order_g);
router.get("/itemsorder/:id", checkAuth, orderController.order_item_by_orderid_g);

module.exports = router;