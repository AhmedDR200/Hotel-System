const asyncHandler = require('express-async-handler');
const User = require('../models/userSchema');
const ApiError = require('../utils/apiError');


/**
 * @desc    Create a new user
 * @route   POST /api/users
 * @access  Private/Admin
*/
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    res.status(201).json({
        success: true,
        data: user
    });
});


/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
*/
exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        data: users
    });
});


/**
 * @desc    Get a single user
 * @route   GET /api/users/:id
 * @access  Private/Admin
*/
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ApiError(`User not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: user
    });
});


/**
 * @desc    Update a user
 * @route   PATCH /api/users/:id
 * @access  Private/Admin
*/
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!user) {
        return next(new ApiError(`User not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: user
    });
});


/**
 * @desc    Delete a user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
*/
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new ApiError(`User not found with id of ${req.params.id}`, 404));
    }

    res.status(204).json({
        success: true,
        data: {}
    });
});