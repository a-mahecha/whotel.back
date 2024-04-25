var express = require('express');
var router = express.Router();

const UserController = require('../Controllers/UserController');

router.post("/", UserController.create);
router.post("/login", UserController.login);

module.exports = router;