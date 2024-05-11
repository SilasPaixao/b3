import { StockModel } from '../../../../domain/models/stock'

export interface LoadStocksRepository {
  loadAll (): Promise<StockModel[]>
}
