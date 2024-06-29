import { Express } from 'express'
import configSwagger from '../../main/docs'
import { serve, setup} from 'swagger-ui-express'
import { noCache } from '../middlewares/no-cache'

export default (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(configSwagger))
}
