import * as express from 'express'
import * as request from 'supertest'
import { mountPipeline } from '../src'
import restful from './middleware/restful'
import controller from './controller'

let app: express.Application | null

describe('\nApp: Auto Router ->\n', () => {

  beforeAll(async () => {
    app = express()
    app.use(restful)
    mountPipeline('/api', 'controller', app, { root: 'tests' })
  })

  afterAll(() => {
    app = null
  })

  test('GET /api/account/home -> json:ok', async () => {
    let res: request.Response = await request(app).get('/api/account/home')
    expect(res.body).toEqual({
      test: 'ok'
    })
  })

  test('POST /api/account/login -> api:ok', async () => {
    let res: request.Response = await request(app).post('/api/account/login')
    expect(res.body.data).toEqual({
      test: 'ok'
    })
  })

  test('GET /api/account/help -> notfound:ok', async () => {
    let res: request.Response = await request(app).get('/api/account/help')
    expect(res.status).toBe(404)
  })

})

describe('\nApp: Manual Router ->\n', () => {

  beforeAll(async () => {
    app = express()
    app.use(restful)
    app.use('/api', controller)
  })

  afterAll(() => {
    app = null
  })

  test('GET /api/account/home -> json:ok', async () => {
    let res: request.Response = await request(app).get('/api/account/home')
    expect(res.body).toEqual({
      test: 'ok'
    })
  })

  test('POST /api/account/login -> api:ok', async () => {
    let res: request.Response = await request(app).post('/api/account/login')
    expect(res.body.data).toEqual({
      test: 'ok'
    })
  })

  test('GET /api/account/help -> notfound:ok', async () => {
    let res: request.Response = await request(app).get('/api/account/help')
    expect(res.status).toBe(404)
  })

})
