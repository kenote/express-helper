import * as express from 'express'
import * as request from 'supertest'
import { mountPipeline } from '../src'

let app: express.Application | null

describe('App: Router ->\n', () => {

  beforeAll(async () => {
    app = express()
    await mountPipeline('/api', 'tests/controller', app)
  })

  afterAll(() => {
    app = null
  })

  test('GET /api/account/home', async () => {
    let res: request.Response = await request(app).get('/api/account/home')
    expect(res.body).toEqual({
      test: 'ok'
    })
  })

  test('POST /api/account/login', async () => {
    let res: request.Response = await request(app).post('/api/account/login')
    expect(res.body).toEqual({
      test: 'ok'
    })
  })

})
