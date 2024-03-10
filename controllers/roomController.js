const asyncHandler = require('express-async-handler');
const Room = require('../models/roomSchema');
const User = require('../models/userSchema');
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


/**
 * @desc    Get All rooms with pagination, filtering, sorting and fields
 * @route   GET /api/rooms
 * @access  Public
*/
exports.getRoomsAdvanced = asyncHandler(async (req, res, next) => {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = Room.find(JSON.parse(queryStr)).populate('availableServices');

    // Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Room.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const rooms = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }

    res.status(200).json({
        success: true,
        count: rooms.length,
        pagination,
        data: rooms
    });
});


/**
 * @desc    Add rooms to user wishlist
 * @route   POST /api/rooms/:id/wishlist
 * @access  Private / User
*/
exports.addRoomToWishlist = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ApiError(`User not found with id of ${req.user.id}`, 404));
    }

    if (user.wishlist.includes(req.params.id)) {
        return next(new ApiError(`Room already in wishlist`, 400));
    }

    user.wishlist.push(req.params.id);

    await user.save();

    res.status(200).json({
        success: true,
        data: user
    });

});


/**
 * @desc    Remove rooms from user wishlist
 * @route   DELETE /api/rooms/:id/wishlist
 * @access  Private / User
*/
exports.removeRoomFromWishlist = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ApiError(`User not found with id of ${req.user.id}`, 404));
    }

    if (!user.wishlist.includes(req.params.id)) {
        return next(new ApiError(`Room not in wishlist`, 400));
    }

    user.wishlist = user.wishlist.filter(room => room.toString() !== req.params.id);

    await user.save();

    res.status(200).json({
        success: true,
        data: user
    });

});