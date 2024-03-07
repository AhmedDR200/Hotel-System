const validationError = require('../middlewares/validationMiddleware');
const { body } = require('express-validator');


exports.createServiceValidator = [
    body('name')
    .isEmpty()
    .withMessage('Please add a service name')
    .isLength({ min: 3, max: 30 }),

    validationError
];