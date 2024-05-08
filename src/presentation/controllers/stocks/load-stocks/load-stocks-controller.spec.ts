import { LoadStocksController } from './load-stocks-controller'
import { StockModel, LoadStocks } from './load-stocks-controller-protocols'

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

describe('LoadStocks Controller', () => {

  test('Should call LoadStocks', async () => {
    class LoadStocksStub implements LoadStocks {
      async load(): Promise<StockModel[]> {
        return new Promise(resolve => resolve(makeFakeStocks()))
      }
    }
    const loadStocksStub = new LoadStocksStub()
    const loadSpy = jest.spyOn(loadStocksStub, 'load')
    const sut = new LoadStocksController(loadStocksStub)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
