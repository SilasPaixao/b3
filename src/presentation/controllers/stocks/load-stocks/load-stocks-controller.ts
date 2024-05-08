import { Controller, HttpRequest, HttpResponse, LoadStocks } from './load-stocks-controller-protocols'

export class LoadStocksController implements Controller {
  constructor (private readonly loadStocks: LoadStocks) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadStocks.load()
    return null
  }
}
