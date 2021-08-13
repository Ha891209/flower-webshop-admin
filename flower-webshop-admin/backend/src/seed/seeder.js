const fsp = require('fs').promises;
const Customers = require('../models/customer.model');
const Flowers = require('../models/flower.model');
const Orders = require('../models/order.model');
const Users = require('../models/user.model');
const Address = require('../models/address.model')

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
        console.log('FLOWERS NOT FOUND');
    }

    seedCollection(Address, 'address');
    seedCollection(Customers, 'customers');
    seedCollection(Flowers, 'flowers');
    seedCollection(Orders, 'orders');
    seedCollection(Users, 'users');
})();