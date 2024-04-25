var express = require('express');
var router = express.Router();

const roomClientController = require('../Controllers/RoomClientController');
const checkAuth = require('../Middleware/check-auth');

router.get("/", checkAuth, roomClientController.getAll);
router.post("/getbyroom", checkAuth, roomClientController.getByRoom);
router.post("/getbyclient", checkAuth, roomClientController.getByClientId);
router.post("/updatestatus", checkAuth, roomClientController.updateStatus);
router.post("/", checkAuth, roomClientController.create);

module.exports = router;