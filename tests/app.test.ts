import * as express from 'express'
import * as request from 'supertest'
import { mountPipeline, mountPipelineHandle } from '../src'
import restful from './middleware/restful'

let app: express.Application | null

describe('\nApp: Router ->\n', () => {

  beforeAll(async () => {
    app = express()
    app.use(restful)
    app.use(... await mountPipelineHandle('/api', 'tests/controller'))
    // await mountPipeline('/api', 'tests/controller', app)
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
