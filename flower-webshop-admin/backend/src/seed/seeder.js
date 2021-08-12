const fsp = require('fs').promises;
const Customer = require('../models/customer.model');
const Flower = require('../models/flower.model');
const Order = require('../models/order.model');
const User = require('../models/user.model');

const seedCollection = async (model, fileName) => {
    try {
        const exists = await model.find().count();
        if (!exists) {
            throw new Error();
        }
    } catch (e) {
        const source = await fsp.readFile(
            `./src/seed/${fileName}.json`,
            'utf8'
        );
        const list = JSON.parse(source);
        if (model && model.insertMany) {
            await model.insertMany(list, { limit: 100 });
        }
    }
};

(async () => {

    try {
        await Flower.db.dropCollection('Flower');
    } catch (e) {
        console.log('CARS NOT FOUND');
    }

    seedCollection(Customer, 'customers');
    seedCollection(Flower, 'flower');
    seedCollection(Order, 'order');
    seedCollection(User, 'user');
})();