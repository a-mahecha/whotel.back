var express = require('express');
var router = express.Router();

const exampleController = require('../controllers/ExampleController');

router.post("/examplepost", exampleController.examplepost);
router.get("/exampleget", exampleController.exampleget);


module.exports = router;