const express = require('express');
const config = require('config');
const logger = require('./config/logger');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const fsp = require('fs').promises;

// Authenctication.
const authenticateJwt = require('./auth/authenticate');
const adminOnly = require('./auth/adminOnly');
const authHandler = require('./auth/authHandler');

const swaggerDocument = YAML.load('./docs/swager.yaml');

const { user, password, host } = config.get('database');
mongoose
    .connect(`mongodb+srv://${user}:${password}@${host}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => logger.info('MongoDB connection has been established successfully.'))
    .catch(err => {
        logger.error(err);
        process.exit();
    });


app.use(morgan('combined', { stream: logger.stream }));
app.use(express.static('public'));
app.use(express.json());

// Router.
app.post('/login', authHandler.login);

app.use('/orders', authenticateJwt, require('./controllers/orders/order.routes'));
app.use('/customers', authenticateJwt, require('./controllers/customers/customers.routes'));
app.use('/flowers', authenticateJwt, require('./controllers/flowers/flowers.routes'));
app.use('/users', authenticateJwt, require('./controllers/users/users.routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



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
