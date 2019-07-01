import { Request, Response, NextFunction } from 'express'
import { Controller, Path, Router, Filter } from '../../src'
import accountFilter from '../filters/account'
import { IResponse } from '../middleware/restful'

@Path('/account')
export default class Account extends Controller {

  @Router({ method: 'get', path: '/home' })
  public home (req: Request, res: Response, next: NextFunction): Response {
    return res.json({ test: 'ok' })
  }

  @Router({ method: 'post', path: '/login' })
  @Filter(accountFilter.login)
  public login (document: any, req: Request, res: IResponse, next: NextFunction): Response {
    return res.api(document)
  }

  @Router({ method: 'get', path: '/help' })
  public help (req: Request, res: IResponse, next: NextFunction): void {
    return res.notfound()
  }
}
