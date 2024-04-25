var express = require('express');
var router = express.Router();

const clientController = require('../Controllers/ClientController');
const checkAuth = require('../Middleware/check-auth');

router.get("/", checkAuth, clientController.getAll);
router.post("/getbydocument", checkAuth, clientController.getByDocument);
router.post("/", checkAuth, clientController.create);

module.exports = router;