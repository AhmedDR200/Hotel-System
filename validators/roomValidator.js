const validationError = require('../middlewares/validationMiddleware');
const { body } = require('express-validator');


exports.createRoomValidator = [

  // Name validation
  body('name')
  .isString()
  .isLength({ min: 3, max: 30 })
  .withMessage('Name must be a string with a length between 3 and 30 characters'),

  // Location validation
  body('location')
  .isObject()
  .withMessage('Location must be an object with latitude and longitude properties'),

  // Night price validation
  body('nightPrice')
  .isNumeric()
  .withMessage('Night price must be a number')
  .isFloat({ min: 0 })
  .withMessage('Night price must be a positive number'),

  // Capacity validation
  body('capacity')
  .isNumeric()
  .withMessage('Capacity must be a number')
  .isInt({ min: 1 })
  .withMessage('Capacity must be an integer greater than 0'),

  // Available Services validation
  body('availableServices')
  .isArray()
  .withMessage('Available Services must be an array of service references'),

  // Notes validation
  body('notes')
  .isString()
  .optional(),

  // Active validation
  body('active')
  .optional()
  .isBoolean()
  .toBoolean(),

    validationError
];