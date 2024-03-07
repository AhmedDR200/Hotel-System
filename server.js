// 3rd Party Modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config();

// Custom Modules
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');

// Routes
const userRoute = require('./routes/userRoute');
const serviceRoute = require('./routes/serviceRoute');

// DB Connection
require('./config/db')();

// Express App
const app = express();

// Body Parser
app.use(express.json());


// Morgan Middleware => Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mounting Routes
app.use('/api/users', userRoute);
app.use('/api/services', serviceRoute);


// 404 Error Handling Middleware
app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find ${req.originalUrl} on this server`, 400));
});

// Global Error Handling Middleware
app.use(globalError);


// Server Connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server (${process.env.NODE_ENV} mode) listening at http://localhost:${port}`)
});


// Events => Event Loop => Callback Queue => Event Loop => Event Handler
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err);
    process.exit(1);
});