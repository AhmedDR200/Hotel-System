/**
 * @class ApiError
 * @extends Error
 * @description Represents an API error used for handling errors in the application.
 * @param {string} message - The error message.
 * @param {number} statusCode - The HTTP status code for the error.
 * @param {boolean} [isOperational=true] - Flag to differentiate between operational errors and programming errors.
 */
class ApiError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = isOperational;
        this.timestamp = new Date().toISOString();
    }
}

module.exports = ApiError;
