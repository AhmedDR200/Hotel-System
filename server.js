// 3rd Party Modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

// DB Connection
require('./config/db')();

const app = express();





// Morgan Middleware => Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}






// Server Connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server (${process.env.NODE_ENV} mode) listening at http://localhost:${port}`)
});