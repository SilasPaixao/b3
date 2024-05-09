import { StockMongoRepository } from '../../../../../infra/db/mongodb/stock/stock-mongo-repository'
import { LoadStocks } from '../../../../../domain/usecases/load-stocks'
import { DbLoadStocks } from '../../../../../data/usecases/load-stocks/db-load-stocks'

export const makeDbLoadStocks = (): LoadStocks => {
  const stockMongoRepository = new StockMongoRepository()
  return new DbLoadStocks(stockMongoRepository)
}
