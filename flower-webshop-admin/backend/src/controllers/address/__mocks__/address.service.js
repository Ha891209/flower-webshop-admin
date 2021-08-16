const addressService = jest.mock('./address.service.js');

let mockData;

addressService.findOne = jest.fn(id => Promise.resolve(
    mockData.find(p => p.id === id))
);

addressService.__setMockData = data => mockData = data;

module.exports = addressService;