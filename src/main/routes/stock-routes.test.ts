import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let stockCollection: Collection

describe('Stock Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    stockCollection = await MongoHelper.getCollection('stocks')
    await stockCollection.deleteMany({})
  })

  describe('POST /stocks', () => {
    test('Should return 204 on add stock success', async () => {
      await request(app)
        .post('/api/stocks')
        .send({
          year: '2000',
          stock: 'petrobras',
          acronym: 'petr4',
          profit: '10%'
        })
        .expect(204)
    })
  })
})
