const flowersService = jest.mock('./flowers.service.js');

let mockData;

flowersService.findOne = jest.fn(id => Promise.resolve(
    mockData.find(p => p.id === id))
);

flowersService.__setMockData = data => mockData = data;

module.exports = flowersService;