import { DbAddStock } from './db-add-stock'
import { AddStockModel, AddStockRepository } from './db-add-stock-protocols'

const makeFakeStockData = (): AddStockModel => ({
  year: '2000',
  stock: 'petrobras',
  acronym: 'petr4',
  lucro: '10%'
})

describe('DbAddStock Usecase', () => {
  test('Should call AddStockRepository with correct values', async () => {
    class AddStockRepositoryStub implements AddStockRepository {
      async add (stockData: AddStockModel): Promise<void> {
        return new Promise(resolve => resolve())
      }
    }
    const addStockRepositoryStub = new AddStockRepositoryStub()
    const addSpy = jest.spyOn(addStockRepositoryStub, 'add')
    const sut = new DbAddStock(addStockRepositoryStub)
    const stockData = makeFakeStockData()
    await sut.add(stockData)
    expect(addSpy).toHaveBeenCalledWith(stockData)
  })
})
