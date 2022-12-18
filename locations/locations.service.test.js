const locationsService = require('locations.service')
const Location = require('./locations.model')

jest.mock('./locations.model')

test('Should get all locations', async () => {
    Location.find.mockResolvedValue([])
    const findSpy = jest.spyOn(Location, 'find')
    expect(await locationsService.getAll()).toEqual([])
    expect(findSpy).toHaveBeenCalledTimes(1)
})


describe('Locations getOne', () => {
    it('Should find one specified location', async () => {
        const mocklocation= {_id:'63716865fe78198e75c0a2d2'}
        Location.find.mockResolvedValue(mocklocation)

        expect(await locationsService.getOne('63716865fe78198e75c0a2d2')).toEqual(mocklocation)
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })
})