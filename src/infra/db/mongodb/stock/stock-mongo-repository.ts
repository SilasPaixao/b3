import { AddStockRepository } from '../../../../data/protocols/db/stock/add-stock-repository'
import { AddStockModel } from '../../../../domain/usecases/add-stock'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadStocksRepository } from '../../../../data/protocols/db/stock/load-stocks-repository'
import { StockModel } from '../../../../domain/models/stock'
import { ObjectId } from 'mongodb'


export class StockMongoRepository implements AddStockRepository, LoadStocksRepository {
  async add (stockData: AddStockModel): Promise<void> {
    const stockCollection = await MongoHelper.getCollection('stocks')
    await stockCollection.insertOne(stockData)
  }

  async loadAll (): Promise<StockModel[]> {
    const stockCollection = await MongoHelper.getCollection('stocks')
    const stocksFromDB = await stockCollection.find().toArray()
    const stocks: StockModel[] = stocksFromDB.map((stockDoc: any) => {
      const { _id, year, stock, acronym, profit } = stockDoc
      return {
        id: _id.toString(),
        year,
        stock,
        acronym,
        profit
      }
    })
    return stocks;
  }
  
}
