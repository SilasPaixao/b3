import { Controller, HttpRequest, HttpResponse, Validation, AddStock } from './add-stock-controller-protocols'
import { badRequest, serverError } from '../../../helpers/http/http-helper'

export class AddStockController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addStock: AddStock
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { year, stock, acronym, lucro } = httpRequest.body
      await this.addStock.add({
        year,
        stock,
        acronym,
        lucro
      })
    } catch (error) {
      return serverError(error)
    }

    return null
  }
}
