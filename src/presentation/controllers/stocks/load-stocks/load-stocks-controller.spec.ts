import { LoadStocksController } from './load-stocks-controller'
import { StockModel, LoadStocks } from './load-stocks-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'

const makeFakeStocks = (): StockModel[] => {
  return [{
    id: 'any_id',
    year: '2000',
    stock: 'petrobras',
    acronym: 'petr4',
    profit: '10%'
  }
    , {
    id: 'other_id',
    year: '2000',
    stock: 'petrobras',
    acronym: 'petr4',
    profit: '10%'
  }]
}

interface SutTypes {
  sut: LoadStocksController
  loadStocksStub: LoadStocks
}

const makeLoadStocks = (): LoadStocks => {
  class LoadStocksStub implements LoadStocks {
    async load(): Promise<StockModel[]> {
      return new Promise(resolve => resolve(makeFakeStocks()))
    }
  }
  return new LoadStocksStub()
}

const makeSut = (): SutTypes => {
  const loadStocksStub = makeLoadStocks()
  const sut = new LoadStocksController(loadStocksStub)
  return {
    sut,
    loadStocksStub
  }
}

describe('LoadStocks Controller', () => {

  test('Should call LoadStocks', async () => {

    const { sut, loadStocksStub } = makeSut()
    const loadSpy = jest.spyOn(loadStocksStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeStocks()))
  })

  test('Should return 500 if LoadStocks throws', async () => {
    const { sut, loadStocksStub } = makeSut()
    jest.spyOn(loadStocksStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
