const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');

const addressController = require('./address.controller');
const addressService = require('./address.service');

jest.mock('./address.service.js');

describe("address controller", () => {
    const mockData = [
        { "id": 1, "zip": 1023, "country": "Hungary", "city": "Budapest", "street": "Kis utca" },
        { "id": 2, "zip": 1213, "country": "Hungary", "city": "Budapest", "street": "Nagy utca" },
        { "id": 3, "zip": 1024, "country": "Hungary", "city": "Budapest", "street": "Dobó utca" },
        { "id": 4, "zip": 1145, "country": "Hungary", "city": "Budapest", "street": "Kertes utca" },
        { "id": 5, "zip": 1230, "country": "Hungary", "city": "Budapest", "street": "Nagy körút" }];

    let response;
    const nextFunction = jest.fn();

    beforeEach(() => {
        addressService.__setMockData(mockData);
        response = mockResponse();
    });

    test("find one with valid id", () => {
        const ADDRESS_ID = 1;

        const request = mockRequest({
            params: {
                id: ADDRESS_ID
            }
        });

        return addressController.findOne(request, response, nextFunction)
            .then(() => {
                expect(addressService.findOne).toBeCalledWith(ADDRESS_ID);
                expect(response.json).toBeCalledWith(
                    mockData.find(p => p.id === ADDRESS_ID)
                );
            })
    });
});