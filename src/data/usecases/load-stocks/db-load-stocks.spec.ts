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

describe('DbLoadStocks', () => {
  test('Should call LoadStocksRepository', async () => {
    class LoadStocksRepositoryStub implements LoadStocksRepository {
      async loadAll (): Promise<StockModel[]> {
        return new Promise(resolve => resolve(makeFakeStocks()))
      }
    }
    const loadStocksRepositoryStub = new LoadStocksRepositoryStub()
    const loadAllSpy = jest.spyOn(loadStocksRepositoryStub, 'loadAll')
    const sut = new DbLoadStocks(loadStocksRepositoryStub)
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
