const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');

const customerController = require('./customers.controller');
const customerService = require('./customers.service');

jest.mock('./customers.service.js');
1
describe("customer controller", () => {
    const mockData = [
        { "id": 1, "firstName": "Damian", "lastName": "Shambroke", "email": "dshambroke0@spotify.com", "address": "Kis utca", "active": true },
        { "id": 2, "firstName": "Allan", "lastName": "Shrimptone", "email": "ashrimptone1@squarespace.com", "address": "Nagy utca", "active": true },
        { "id": 3, "firstName": "Rutger", "lastName": "Barzen", "email": "rbarzen2@go.com", "address": "Dobó utca", "active": false },
        { "id": 4, "firstName": "Celinda", "lastName": "Tritton", "email": "ctritton3@gnu.org", "address": "Kertes utca", "active": true },
        { "id": 5, "firstName": "Gabby", "lastName": "Endon", "email": "gendon4@themeforest.net", "address": "Nagy körút", "active": false }];

    let response;
    const nextFunction = jest.fn();

    beforeEach(() => {
        customerService.__setMockData(mockData);
        response = mockResponse();
    });

    test("find one with valid id", () => {
        const CUSTOMER_ID = 1;

        const request = mockRequest({
            params: {
                id: CUSTOMER_ID
            }
        });

        return customerController.findOne(request, response, nextFunction)
            .then(() => {
                expect(customerService.findOne).toBeCalledWith(CUSTOMER_ID);
                expect(response.json).toBeCalledWith(
                    mockData.find(p => p.id === CUSTOMER_ID)
                );
            })
    });
});