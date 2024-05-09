import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddStockController } from '../factories/controllers/stock/add-stock/add-stock-controller-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeLoadStocksController } from '../factories/controllers/stock/load-stocks/load-stocks-controller-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())

  router.post('/stocks', adminAuth, adaptRoute(makeAddStockController()))
  router.get('/stocks', auth, adaptRoute(makeLoadStocksController()))

}
