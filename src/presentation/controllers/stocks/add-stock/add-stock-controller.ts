import { Controller, HttpRequest, HttpResponse, Validation } from './add-stock-controller-protocols'

export class AddStockController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return new Promise(resolve => resolve(null))
  }
}
