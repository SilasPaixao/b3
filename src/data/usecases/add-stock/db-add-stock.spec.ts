import { DbAddStock } from './db-add-stock'
import { AddStockModel, AddStockRepository } from './db-add-stock-protocols'

const makeFakeStockData = (): AddStockModel => ({
  year: '2000',
  stock: 'petrobras',
  acronym: 'petr4',
  profit: '10%'
})

const makeAddStockRepository = (): AddStockRepository => {
  class AddStockRepositoryStub implements AddStockRepository {
    async add (stockData: AddStockModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddStockRepositoryStub()
}

interface SutTypes {
  sut: DbAddStock
  addStockRepositoryStub: AddStockRepository
}

const makeSut = (): SutTypes => {
  const addStockRepositoryStub = makeAddStockRepository()
  const sut = new DbAddStock(addStockRepositoryStub)
  return {
    sut,
    addStockRepositoryStub
  }
}

describe('DbAddStock Usecase', () => {
  test('Should call AddStockRepository with correct values', async () => {
    const { sut, addStockRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addStockRepositoryStub, 'add')
    const stockData = makeFakeStockData()
    await sut.add(stockData)
    expect(addSpy).toHaveBeenCalledWith(stockData)
  })
})
