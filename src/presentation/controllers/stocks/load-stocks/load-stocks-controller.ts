import { ok, serverError, noContent } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadStocks } from './load-stocks-controller-protocols'

export class LoadStocksController implements Controller {
  constructor(private readonly loadStocks: LoadStocks) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const stocks = await this.loadStocks.load()
      return stocks.length ? ok(stocks) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
