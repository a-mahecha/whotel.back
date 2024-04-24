var express = require('express');
var router = express.Router();

const clientController = require('../controllers/ClientController');
const checkAuth = require('../middleware/check-auth');

router.get("/", checkAuth, clientController.get_all);
router.post("/create", checkAuth, clientController.client_i);

module.exports = router;