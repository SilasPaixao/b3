import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { AddStockController } from '../../../../presentation/controllers/stocks/add-stock/add-stock-controller'
import { makeAddStockValidation } from './add-stock-validation-factory'
import { makeDbAddStock } from '../../usecases/add-stock/db-add-stock-factory'

export const makeAddStockController = (): Controller => {
  const controller = new AddStockController(makeAddStockValidation(), makeDbAddStock())
  return makeLogControllerDecorator(controller)
}
