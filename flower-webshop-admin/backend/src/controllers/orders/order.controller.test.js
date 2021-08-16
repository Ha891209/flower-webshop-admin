const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');

const orderController = require('./order.controller');
const orderService = require('./order.service');

jest.mock('./order.service.js');

describe("order controller", () => {
    const mockData = [
        { "id": 1, "flowers": 5, "customerID": 3, "amount": 5000, "status": "shipped" },
        { "id": 2, "flowers": 40, "customerID": 4, "amount": 11000, "status": "paid" },
        { "id": 3, "flowers": 7, "customerID": 2, "amount": 16000, "status": "paid" },
        { "id": 4, "flowers": 31, "customerID": 10, "amount": 20000, "status": "new" },
        { "id": 5, "flowers": 14, "customerID": 3, "amount": 12000, "status": "shipped" }];

    let response;
    const nextFunction = jest.fn();

    beforeEach(() => {
        orderService.__setMockData(mockData);
        response = mockResponse();
    });

    test("find one with valid id", () => {
        const ORDER_ID = 1;

        const request = mockRequest({
            params: {
                id: ORDER_ID
            }
        });

        return orderController.findOne(request, response, nextFunction)
            .then(() => {
                expect(orderService.findOne).toBeCalledWith(ORDER_ID);
                expect(response.json).toBeCalledWith(
                    mockData.find(p => p.id === ORDER_ID)
                );
            })
    });
});