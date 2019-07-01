import { Response } from 'express'
import { Middleware, MiddlewareSetting, RegisterMiddlewareMethod } from '../../src'

export interface IResponse extends Response {
  api (data: any): Response
  notfound (): void
}

@MiddlewareSetting({
  header: [
    ['Access-Control-Allow-Origin', '*'],
    ['Access-Control-Allow-Methods', 'GET, POST, PUT'],
    ['Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization'],
    ['X-Powered-By', 'Kenote']
  ]
})
class Restful extends Middleware {

  @RegisterMiddlewareMethod()
  public api (response: Response): any {
    return (data: any): Response => {
      return response.json({ data })
    }
  }

  @RegisterMiddlewareMethod()
  public notfound (response: Response): () => void {
    return () => response.status(404).render('error', { message: 'This page could not be found' })
  }

}

export default new Restful().hendler()
