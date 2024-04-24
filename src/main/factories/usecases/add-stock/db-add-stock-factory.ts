import { AddStock } from '../../../../domain/usecases/add-stock'
import { StockMongoRepository } from '../../../../infra/db/mongodb/stock/stock-mongo-repository'
import { DbAddStock } from '../../../../data/usecases/add-stock/db-add-stock'

export const makeDbAddStock = (): AddStock => {
  const stockMongoRepository = new StockMongoRepository()
  return new DbAddStock(stockMongoRepository)
}
