import { HttpRequest, Validation, AddStock, AddStockModel } from './add-stock-controller-protocols'
import { AddStockController } from './add-stock-controller'
import { badRequest, serverError } from '../../../helpers/http/http-helper'


const makeFakeRequest = (): HttpRequest => ({
  body: {
    year: '2000',
    stock: 'petrobras',
    acronym: 'petr4',
    lucro: '10%'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddStock = (): AddStock => {
  class AddStockStub implements AddStock {
    async add (data: AddStockModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddStockStub()
}

interface SutTypes {
  sut: AddStockController
  validationStub: Validation
  addStockStub: AddStock
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addStockStub = makeAddStock()
  const sut = new AddStockController(validationStub, addStockStub)
  return {
    sut,
    validationStub,
    addStockStub
  }
}

describe('AddStock Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddStock with correct values', async () => {
    const { sut, addStockStub } = makeSut()
    const addSpy = jest.spyOn(addStockStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddStock throws', async () => {
    const { sut, addStockStub } = makeSut()
    jest.spyOn(addStockStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
