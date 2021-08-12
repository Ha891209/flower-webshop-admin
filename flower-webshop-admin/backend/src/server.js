const express = require('express');
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
app.post('/login', authHandler.login);



// app.use('/orders', authenticateJwt, require('./controllers/orders/order.routes'));
// app.use('/customers', authenticateJwt, require('./controllers/customers/customers.routes'));
// app.use('/flowers', authenticateJwt, require('./controllers/flowers/flowers.routes'));
// app.use('/users', authenticateJwt, require('./controllers/users/users.routes'));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/address', require('./controllers/address/address.routes'));
app.use('/orders', require('./controllers/orders/order.routes'));
app.use('/customers', require('./controllers/customers/customers.routes'));
app.use('/flowers', require('./controllers/flowers/flowers.routes'));
app.use('/users', require('./controllers/users/users.routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use((err, req, res, next) => {
    res.status(err.statusCode || 500);
    res.json({
        hasError: true,
        message: err.message
    });
});

module.exports = app;
