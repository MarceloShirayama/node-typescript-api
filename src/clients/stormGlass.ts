import { AxiosStatic } from 'axios'

export class StormGlass {
  protected request: AxiosStatic

  readonly stormGlassAPIParams =
    'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed'

  readonly stormGlassAPISource = 'noaa'

  constructor (request: AxiosStatic) {
    this.request = request
  }

  public async fetchPoints (lat: number, lng: number): Promise<{}> {
    return this.request.get(
    `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}`
    )
  }
}
