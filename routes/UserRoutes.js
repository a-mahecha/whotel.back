var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');
const checkAuth = require('../middleware/check-auth');

router.post("/login", UserController.user_login);

module.exports = router;