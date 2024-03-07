const express = require('express');
const router = express.Router();

const roomController = require('../controllers/roomController');

router.route('/')
.post(roomController.createRoom)
.get(roomController.getRooms);

router.route('/:id')
.patch(roomController.updateRoom)
.delete(roomController.deleteRoom);


module.exports = router;