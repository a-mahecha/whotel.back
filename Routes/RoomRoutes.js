var express = require('express');
var router = express.Router();

const roomController = require('../Controllers/RoomController');
const checkAuth = require('../Middleware/check-auth');

router.get("/", checkAuth, roomController.getAll);
router.post("/getbynumber", checkAuth, roomController.getByNumber);
router.post("/", checkAuth, roomController.create);

module.exports = router;