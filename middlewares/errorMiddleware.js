/**
 * @function globalError
 * @description Global error handling middleware.
 * @param {Error} err - The error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 */
const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Include only necessary error information in the response
    const responseError = {
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
        // Optionally include the error code if available
        errorCode: err.errorCode || '',
    };

    // Include the stack trace only in development mode
    if (process.env.NODE_ENV === 'development') {
        responseError.stack = err.stack;
    }

    // Log the error for better debugging (consider using a logging library)
    console.error(err);

    res.status(err.statusCode).json(responseError);
};

module.exports = globalError;
