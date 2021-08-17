const express = require('express');
require('dotenv').config();
const config = require('config');
const logger = require('./config/logger');
const app = express();

const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const cors = require('cors');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Authenctication.
const authenticateJwt = require('./auth/authenticate');
const authHandler = require('./auth/authHandler');

const swaggerDocument = YAML.load('./docs/swager.yaml');

mongoose.Promise = global.Promise;

// Connect to MongoDB database
(async () => {
    try {
        const { host, username, password } = config.get('database');
        const connectionString = `mongodb+srv://${username}:${password}@${host}`;
        await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        logger.info('MongoDB connection has been established successfully.');
    } catch (error) {
        logger.error(error.message);
        process.exit();
    }
})();

app.use(cors());
app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());

// Router.
app.post('/api/login', authHandler.login);
app.use('/api/users', authenticateJwt, require('./controllers/users/users.routes'));
app.use('/api/orders', authenticateJwt, require('./controllers/orders/order.routes'));
app.use('/api/customers', authenticateJwt, require('./controllers/customers/customers.routes'));
app.use('/api/flowers', authenticateJwt, require('./controllers/flowers/flowers.routes'));
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static('public'));
// Frontend routing to force
app.get('*', (_req, res) => {
    res.sendFile(join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
    if (!err.statusCode) {
        res.status(500);
    } else {
        res.status(err.statusCode);
    }
    logger.error(err.message);
    res.send(err.message);
});

module.exports = app;

