const validationError = require('../middlewares/validationMiddleware');
const { body } = require('express-validator');
const User = require('../models/userSchema');


exports.createUserValidator = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3, max: 30 })
        .withMessage('Name must be between 3 to 30 characters'),

    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email')
        .custom((val) => User.findOne({ email: val }).then(user =>{
            if(user) return Promise.reject('Email already exists');
        })),

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


exports.updateUserValidator = [
    body('name')
        .optional()
        .isLength({ min: 3, max: 30 })
        .withMessage('Name must be between 3 to 30 characters'),

    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email')
        .custom((val, { req }) => User.findOne({ email: val }).then(user =>{
            if(user && user._id != req.params.id) return Promise.reject('Email already exists');
        })),

    body('password')
        .optional()
        .isLength({ min: 8, max: 16 })
        .withMessage('Password must be between 8 to 16 characters'),

    body('phone')
        .optional()
        .isMobilePhone(['ar-EG'])
        .withMessage('Invalid phone number'),

    body('role')
        .optional()
        .isIn(['admin', 'user'])
        .withMessage('Invalid role'),

    validationError,
];


exports.getUserValidator = [
    body('id')
    .isMongoId()
    .withMessage('Invalid User ID Provided !'),

    validationError
];