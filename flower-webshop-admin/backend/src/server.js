const config = require('config');

const express = require('express');
const cors = require('../config/cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const logger = require('./config/logger');

const app = express();

// Authenctication.
const authHandler = require('./auth/authHandler');
const authenticateJwt = require('./auth/authenticate');

mongoose.Promise = global.Promise;

// Connect to MongoDB database
(async () => {
    try {
        const { host, user, password } = config.get('database');
        const connectionString = `mongodb+srv://${user}:${password}@${host}`;
        await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        logger.info('MongoDB connection has been established successfully.');
    } catch (error) {
        logger.error(error.message);
        process.exit();
    }
})();

app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());
app.use(cors());

// Router.
app.post('/login', authHandler.login);
app.post('/refresh', authHandler.refresh);
app.post('/logout', authHandler.logout);

app.use('/orders', authenticateJwt, require('./controllers/orders/order.routes'));
app.use('/customers', authenticateJwt, require('./controllers/customers/customers.routes'));
app.use('/flowers', authenticateJwt, require('./controllers/flowers/flowers.routes'));


app.use((err, _req, res, _next) => {
    if (!err.statusCode) {
        res.status(500);
    } else {
        res.status(err.statusCode);
    }
    logger.error(err.message);
    res.send(err.message);
});

module.exports = app;
