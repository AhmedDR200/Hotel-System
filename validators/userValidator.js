const validationError = require('../middlewares/validationMiddleware');
const { body } = require('express-validator');


exports.createUserValidator = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3, max: 30 })
        .withMessage('Name must be between 3 to 30 characters'),

    body('email')
        .notEmpty()
        .withMessage('Email is required'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8, max: 16 })
        .withMessage('Password must be between 8 to 16 characters'),

    body('phone')
        .notEmpty()
        .withMessage('Phone is required')
        .isMobilePhone(['ar-EG'])
        .withMessage('Invalid phone number'),

    body('role')
        .notEmpty()
        .withMessage('Role is required')
        .isIn(['admin', 'user'])
        .withMessage('Invalid role'),

    validationError,
];
