import { StockModel } from '../models/stock'

export interface LoadStocks {
  load (): Promise<StockModel[]>
}
