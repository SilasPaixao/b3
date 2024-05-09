import { MongoHelper } from '../helpers/mongo-helper'
import { StockMongoRepository } from './stock-mongo-repository'
import { Collection } from 'mongodb'

let stockCollection: Collection

const makeSut = (): StockMongoRepository => {
  return new StockMongoRepository()
}

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

  describe('add()', () => {
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
  describe('loadAll()', () => {
    test('Should load all stocks on success', async () => {
      await stockCollection.insertMany([{
        year: '2000',
        stock: 'petrobras',
        acronym: 'petr4',
        profit: '10%'
      }, {
        year: '2001',
        stock: 'Ambev',
        acronym: 'ABEV3',
        profit: '10%'
      }])
      const sut = makeSut()
      const stocks = await sut.loadAll()
      expect(stocks.length).toBe(2)
      expect(stocks[0].year).toBe('2000')
      expect(stocks[1].year).toBe('2001')
    })
  })
})
