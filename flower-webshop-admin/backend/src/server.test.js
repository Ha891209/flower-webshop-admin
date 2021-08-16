const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('config');
const Users = require('./models/user.model')
const { response } = require('express');

describe('REST API integration tests', () => {
    const insertData = [
        {
            firstName: 'Joe',
            lastName: 'Firpo',
            email: 'jf@gmail.com'
        },
        {
            firstName: 'Damian',
            lastName: 'Shambroke',
            email: 'dshambroke0@spotify.com'
        }
    ];

    beforeEach(done => {
        try {
            const { host, username, password } = config.get('database');
            const connectionString = `mongodb+srv://${username}:${password}@${host}`;
            mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
            logger.info('MongoDB connection has been established successfully.');
        } catch (error) {
            logger.error(error.message);
            process.exit();
        };

        afterEach(done => {
            mongoose.connection.db.dropDatabase(() => {
                mongoose.connection.close(() => done())
            });
        });

        test('GET / users', () => {
            return Users.insertMany(insertData)
                .then(() => supertest(app).get('/users').expect(200))
                .then(response => {
                    expect(Array.isArray(response.body)).toBeTruthy();
                    expect(response.body.length).toEqual(insertData.length);

                    response.body.forEach((users, index) => {
                        expect(users.firstName).toBe(insertData[index].firstName);
                        expect(users.lastName).toBe(insertData[index].lastName);
                        expect(users.email).toBe(insertData[index].email);
                    });
                });

        });

        test('GET /users/:id', () => {
            let firstPostId;
            return Users.insertMany(insertData)
                .then(people => {
                    firstPostId = people[0]._id;
                    return supertest(app).get(`/users/${firstPostId}`).expect(200);
                })
                .then(response => {
                    const users = response.body;
                    expect(users.firstName).toBe(insertData[0].firstName);
                    expect(users.lastName).toBe(insertData[0].lastName);
                    expect(users.email).toBe(insertData[0].email);
                });
        });
    })
})