import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddStockController } from '../factories/controllers/stock/add-stock/add-stock-controller-factory'
import { makeLoadStocksController } from '../factories/controllers/stock/load-stocks/load-stocks-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {

  router.post('/stocks', adminAuth, adaptRoute(makeAddStockController()))
  router.get('/stocks', auth, adaptRoute(makeLoadStocksController()))

}
