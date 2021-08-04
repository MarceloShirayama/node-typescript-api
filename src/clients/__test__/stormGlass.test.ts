import axios from 'axios'
import { StormGlass } from '@src/clients/stormGlass'
import {
  stormglassWeather3Hours, stormglassNormalizedResponse3Hours
} from '@test/fixtures'

jest.mock('axios')

describe('StormGlass client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  it('Should return the normalized forecast form the StormGlass service', async () => {
    const lat = -33.792726
    const lng = 151.289824

    // axios.get = jest.fn().mockResolvedValue({ data: stormglassWeather3Hours })
    mockedAxios.get.mockResolvedValue({ data: stormglassWeather3Hours })

    const stormGlass = new StormGlass(mockedAxios)
    const response = await stormGlass.fetchPoints(lat, lng)
    expect(response).toEqual(stormglassNormalizedResponse3Hours)
  })
})
