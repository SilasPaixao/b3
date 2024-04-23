import { MongoHelper } from '../helpers/mongo-helper'
import { StockMongoRepository } from './stock-mongo-repository'
import { Collection } from 'mongodb'

let stockCollection: Collection

describe('Stock Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    stockCollection = await MongoHelper.getCollection('stocks')
    await stockCollection.deleteMany({})
  })

  const makeSut = (): StockMongoRepository => {
    return new StockMongoRepository()
  }

  test('Should add a stock on success', async () => {
    const sut = makeSut()
    await sut.add({
      year: '2000',
      stock: 'petrobras',
      acronym: 'petr4',
      profit: '10%'
    })

    const stock = await stockCollection.findOne({ year: '2000' })
    expect(stock).toBeTruthy()
  })
})
