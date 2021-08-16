const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');

const flowersController = require('./flowers.controller');
const flowersService = require('./flowers.service');

jest.mock('./flowers.service.js');

describe("flowers controller", () => {
    const mockData = [
        { "id": 1, "description": "With its feminine feel and European charm, this alluring glass cube is the perfect Mother's Day surprise! It's carefully hand-decorated and filled with a fresh bouquet of daisies and roses.", "name": "Wildflower In Flight Bouquet", "price": 10, "active": true },
        { "id": 2, "description": "The shimmering, ir_idescent aqua blue glass of this stunning cylinder vase is the perfect partner for a fresh, fabulous bouquet of lavender roses, alstroemeria and tulips!", "name": "Art Glass Garden Bouquet", "price": 5000, "active": true },
        { "id": 3, "description": "A truly breathtaking tribute to your love, this romantic arrangement bursts with a dozen and a half red and white roses, nestled among delicate greens.", "name": "Yours Truly Bouquet", "price": 7000, "active": true },
        { "id": 4, "description": "Just fabulous! From its perky pink cube and perfect pink roses, to its textural greens and dramatic pink lilies, this chic bouquet is flora at its finest!", "name": "Fabulous Flora Bouquet", "price": 8000, "active": true },
        { "id": 5, "description": "Timeless and touching, this serenely beautiful bouquet of peach and white blooms is perfectly presented in a classic mercury glass hurricane. Two gifts in one, it later transforms into a shimmering candleholder.", "name": "Endless Lovelies Bouquet", "price": 9000, "active": false }];

    let response;
    const nextFunction = jest.fn();

    beforeEach(() => {
        flowersService.__setMockData(mockData);
        response = mockResponse();
    });

    test("find one with valid id", () => {
        const FLOWERS_ID = 1;

        const request = mockRequest({
            params: {
                id: FLOWERS_ID
            }
        });

        return flowersController.findOne(request, response, nextFunction)
            .then(() => {
                expect(flowersService.findOne).toBeCalledWith(FLOWERS_ID);
                expect(response.json).toBeCalledWith(
                    mockData.find(p => p.id === FLOWERS_ID)
                );
            })
    });
});