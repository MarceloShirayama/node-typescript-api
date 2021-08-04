import axios from 'axios'
import { StormGlass } from '@src/clients/stormGlass'
import {
  stormglassWeather3Hours, stormglassNormalizedResponse3Hours
} from '@test/fixtures'

jest.mock('axios')

describe('StormGlass client', () => {
  it('Should return the normalized forecast form the StormGlass service', async () => {
    const lat = -33.792726
    const lng = 151.289824

    axios.get = jest.fn().mockResolvedValue(stormglassWeather3Hours)

    const stormGlass = new StormGlass(axios)
    const response = await stormGlass.fetchPoints(lat, lng)
    expect(response).toEqual(stormglassNormalizedResponse3Hours)
  })
})
