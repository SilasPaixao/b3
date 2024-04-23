import { HttpRequest } from './add-stock-controller-protocols'
import { AddStockController } from './add-stock-controller'
import { Validation } from '../../../protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    year: '2000',
    stock: 'petrobras',
    acronym: 'petr4',
    lucro: '10%'
  }
})

describe('AddStock Controller', () => {
  test('Should call Validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return null
      }
    }
    const validationStub = new ValidationStub()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddStockController(validationStub)
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
