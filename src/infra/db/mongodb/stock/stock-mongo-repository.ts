import { AddStockRepository } from '../../../../data/protocols/db/stock/add-stock-repository'
import { AddStockModel } from '../../../../domain/usecases/add-stock'
import { MongoHelper } from '../helpers/mongo-helper'

export class StockMongoRepository implements AddStockRepository {
  async add (stockData: AddStockModel): Promise<void> {
    const stockCollection = await MongoHelper.getCollection('stocks')
    await stockCollection.insertOne(stockData)
  }
}
