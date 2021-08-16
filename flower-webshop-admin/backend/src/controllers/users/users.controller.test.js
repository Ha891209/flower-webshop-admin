const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');

const usersController = require('./users.controller');
const usersService = require('./users.service');

jest.mock('./users.service.js');

describe("users controller", () => {
    const mockData = [
        { "id": 1, "firstName": "Joe", "lastName": "Firpo", "email": "jf@gmail.com", "active": true, "password": "$2a$10$gM4bsxl5NDA6O3X330UmDOWZWCixRWFR36gNg5yLXf5c6cO0FGq9e", "role": 1 },
        { "id": 2, "firstName": "Damian", "lastName": "Shambroke", "email": "dshambroke0@spotify.com", "active": true, "password": "$2a$10$NcJm8M24sNf8V1RIkScx2u/ei03yjpDFV0H0y1jgXOpacvWcjl0By", "role": 2 }];

    let response;
    const nextFunction = jest.fn();

    beforeEach(() => {
        usersService.__setMockData(mockData);
        response = mockResponse();
    });

    test("find one with valid id", () => {
        const USERS_ID = 1;

        const request = mockRequest({
            params: {
                id: USERS_ID
            }
        });

        return usersController.findOne(request, response, nextFunction)
            .then(() => {
                expect(usersService.findOne).toBeCalledWith(USERS_ID);
                expect(response.json).toBeCalledWith(
                    mockData.find(p => p.id === USERS_ID)
                );
            })
    });
});