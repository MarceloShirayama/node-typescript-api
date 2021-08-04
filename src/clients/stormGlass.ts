import { AxiosStatic } from 'axios'

export type StormGlassPointSource = {
  [key: string]: number
}

export type StormGlassPoint = {
  readonly time: string
  readonly waveHeight: StormGlassPointSource
  readonly waveDirection: StormGlassPointSource
  readonly swellHeight: StormGlassPointSource
  readonly swellDirection: StormGlassPointSource
  readonly swellPeriod: StormGlassPointSource
  readonly windDirection: StormGlassPointSource
  readonly windSpeed: StormGlassPointSource
}

export type StormGlassForecastResponse = {
  hours: StormGlassPoint[]
}

export type ForecastPoint = {
  readonly time: string
  readonly waveHeight: number
  readonly waveDirection: number
  readonly swellHeight: number
  readonly swellDirection: number
  readonly swellPeriod: number
  readonly windDirection: number
  readonly windSpeed: number
}

export class StormGlass {
  protected request: AxiosStatic

  readonly stormGlassAPIParams =
    `
    swellDirection,
    swellHeight,
    swellPeriod,
    waveDirection,
    waveHeight,
    windDirection,
    windSpeed
    `

  readonly stormGlassAPISource = 'noaa'

  constructor (request: AxiosStatic) {
    this.request = request
  }

  public async fetchPoints (lat: number, lng: number): Promise<ForecastPoint[]> {
    try {
      const response = await this.request.get<StormGlassForecastResponse>(
        `
        https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}
        &params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}
        `,
        {
          headers: {
            Authorization: 'fake-token'
          }
        }
      )
      return this.normalizeResponse((response.data))
    } catch (error) {
      throw new Error(
        `Unexpected error when trying to communicate to StormGlass: ${error.message}`
      )
    }
  }

  private normalizeResponse (points: StormGlassForecastResponse): ForecastPoint[] {
    return points.hours
      .filter(this.isValidPoint.bind(this))
      .map(point => ({
        time: point.time,
        waveHeight: point.waveHeight?.[this.stormGlassAPISource],
        waveDirection: point.waveDirection?.[this.stormGlassAPISource],
        swellHeight: point.swellHeight?.[this.stormGlassAPISource],
        swellDirection: point.swellDirection?.[this.stormGlassAPISource],
        swellPeriod: point.swellPeriod?.[this.stormGlassAPISource],
        windDirection: point.windDirection?.[this.stormGlassAPISource],
        windSpeed: point.windSpeed?.[this.stormGlassAPISource]
      }))
  }

  private isValidPoint (point: Partial<StormGlassPoint>): boolean {
    return !!(
      point.time &&
      point.waveHeight?.[this.stormGlassAPISource] &&
      point.waveDirection?.[this.stormGlassAPISource] &&
      point.swellHeight?.[this.stormGlassAPISource] &&
      point.swellDirection?.[this.stormGlassAPISource] &&
      point.swellPeriod?.[this.stormGlassAPISource] &&
      point.windDirection?.[this.stormGlassAPISource] &&
      point.windSpeed?.[this.stormGlassAPISource]
    )
  }
}
