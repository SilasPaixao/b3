import { LoadStocks } from '../../../domain/usecases/load-stocks'
import { StockModel } from '../../../domain/models/stock'
import { LoadStocksRepository } from '../../protocols/db/stock/load-stocks-repository'

export class DbLoadStocks implements LoadStocks {
  constructor (private readonly loadStocksRepository: LoadStocksRepository) {}

  async load (): Promise<StockModel[]> {
    await this.loadStocksRepository.loadAll()
    return []
  }
}
