import { LoadStocksController } from '../../../../../presentation/controllers/stocks/load-stocks/load-stocks-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbLoadStocks } from '../../../usecases/stock/load-stocks/db-load-stocks'

export const makeLoadStocksController = (): Controller => {
  const controller = new LoadStocksController(makeDbLoadStocks())
  return makeLogControllerDecorator(controller)
}
