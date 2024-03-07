const asyncHandler = require('express-async-handler');
const Room = require('../models/roomSchema');
const ApiError = require('../utils/apiError');


/**
 * @desc    Create a new room
 * @route   POST /api/rooms
 * @access  Private/Admin
*/
exports.createRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.create(req.body);

    res.status(201).json({
        success: true,
        data: room
    });
});


/**
 * @desc    Get all rooms
 * @route   GET /api/rooms
 * @access  Public
*/
exports.getRooms = asyncHandler(async (req, res, next) => {
    const rooms = await Room.find();

    res.status(200).json({
        success: true,
        count: rooms.length,
        data: rooms
    });
});


/**
 * @desc    Update a room
 * @route   PATCH /api/rooms/:id
 * @access  Private/Admin
*/
exports.updateRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!room) {
        return next(new ApiError(`Room not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: room
    });

});


/**
 * @desc    Delete a room
 * @route   DELETE /api/rooms/:id
 * @access  Private/Admin
*/
exports.deleteRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
        return next(new ApiError(`Room not found with id of ${req.params.id}`, 404));
    }

    res.status(204).json({
        success: true,
        data: {}
    });
});