import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let stockCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Silas',
    email: 'silas.paixao@gmail.com',
    password: '123',
    role: 'admin'
  })
  const id = res.insertedId
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Stock Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    stockCollection = await MongoHelper.getCollection('stocks')
    await stockCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /stocks', () => {
    test('Should return 403 on add stock without accessToken', async () => {
      await request(app)
        .post('/api/stocks')
        .send({
          year: '2000',
          stock: 'petrobras',
          acronym: 'petr4',
          profit: '10%'
        })
        .expect(403)
    })

    test('Should return 204 on add stock with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/stocks')
        .set('x-access-token', accessToken)
        .send({
          year: '2000',
          stock: 'petrobras',
          acronym: 'petr4',
          profit: '10%'
        })
        .expect(204)
    })
  })

  describe('GET /stocks', () => {
    test('Should return 403 on load stocks without accessToken', async () => {
      await request(app)
        .get('/api/stocks')
        .expect(403)
    })

    test('Should return 204 on load stocks with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/stocks')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
