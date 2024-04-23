import { AddStockModel } from '../../../../domain/usecases/add-stock'

export interface AddStockRepository {
  add (stockData: AddStockModel): Promise<void>
}
