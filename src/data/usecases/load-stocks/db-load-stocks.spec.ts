import { LoadStocksRepository } from '../../protocols/db/stock/load-stocks-repository'
import { StockModel } from '../../../domain/models/stock'
import { DbLoadStocks } from './db-load-stocks'

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
  sut: DbLoadStocks
  loadStocksRepositoryStub: LoadStocksRepository
}

const makeLoadStocksRepository = (): LoadStocksRepository => {
  class LoadStocksRepositoryStub implements LoadStocksRepository {
    async loadAll (): Promise<StockModel[]> {
      return new Promise(resolve => resolve(makeFakeStocks()))
    }
  }
  return new LoadStocksRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadStocksRepositoryStub = makeLoadStocksRepository()
  const sut = new DbLoadStocks(loadStocksRepositoryStub)
  return {
    sut,
    loadStocksRepositoryStub
  }
}

describe('DbLoadStocks', () => {
  test('Should call LoadStocksRepository', async () => {
    const { sut, loadStocksRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadStocksRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
  test('Should return a list of Stocks on success', async () => {
    const { sut } = makeSut()
    const stocks = await sut.load()
    expect(stocks).toEqual(makeFakeStocks())
  })
  test('Should throw if LoadStocksRepository throws', async () => {
    const { sut, loadStocksRepositoryStub } = makeSut()
    jest.spyOn(loadStocksRepositoryStub, 'loadAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
