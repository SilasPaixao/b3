import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddStockController } from '../factories/controllers/stock/add-stock/add-stock-controller-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/stocks', adminAuth, adaptRoute(makeAddStockController()))
}
