import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddStockController } from '../factories/controllers/stock/add-stock/add-stock-controller-factory'

export default (router: Router): void => {
  router.post('/stocks', adaptRoute(makeAddStockController()))
}
