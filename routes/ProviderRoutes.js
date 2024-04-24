var express = require('express');
var router = express.Router();

const providerController = require('../controllers/ProviderController');
const checkAuth = require('../middleware/check-auth');

router.get("/", checkAuth, providerController.get_all);
router.post("/create", checkAuth, providerController.provider_i);

module.exports = router;