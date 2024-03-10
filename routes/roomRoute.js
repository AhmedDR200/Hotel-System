const express = require('express');
const router = express.Router();

const roomController = require('../controllers/roomController');
const roomValidator = require('../validators/roomValidator');

router.route('/')
.post(roomValidator.createRoomValidator, roomController.createRoom)
.get(roomController.getRoomsAdvanced);

router.route('/:id')
.patch(roomController.updateRoom)
.delete(roomController.deleteRoom);


module.exports = router;