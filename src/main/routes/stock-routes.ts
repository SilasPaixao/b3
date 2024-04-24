import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddStockController } from '../factories/controllers/add-stock/add-stock-controller-factory'

export default (router: Router): void => {
  router.post('/stocks', adaptRoute(makeAddStockController()))
}
