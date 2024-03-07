const asyncHandler = require('express-async-handler');
const Service = require('../models/availableServiceSchema');
const ApiError = require('../utils/apiError');


/**
 * @desc    Create a new service
 * @route   POST /api/services
 * @access  Private/Admin
*/
exports.createService = asyncHandler(async (req, res, next) => {
    const service = await Service.create(req.body);

    res.status(201).json({
        success: true,
        data: service
    });
});


/**
 * @desc    Update a service
 * @route   PUT /api/services/:id
 * @access  Private/Admin
*/
exports.updateService = asyncHandler(async (req, res, next) => {
    const service = await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!service) {
        return next(new ApiError('Service not found', 404));
    }

    res.status(200).json({
        success: true,
        data: service
    });

});


/**
 * @desc    Delete a service
 * @route   DELETE /api/services/:id
 * @access  Private/Admin
*/
exports.deleteService = asyncHandler(async (req, res, next) => {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
        return next(new ApiError('Service not found', 404));
    }

    res.status(204).json({
        success: true,
        data: {}
    });
});