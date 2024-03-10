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

router.route('/:id/wishlist')
.post(roomController.addRoomToWishlist)
.delete(roomController.removeRoomFromWishlist);


module.exports = router;