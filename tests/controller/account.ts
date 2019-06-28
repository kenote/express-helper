import { Request, Response, NextFunction } from 'express'
import { Controller, Path, Router, Filter } from '../../src'
import accountFilter from '../filters/account'

@Path('/account')
export default class Account extends Controller {

  @Router({ method: 'get', path: '/home' })
  public home (req: Request, res: Response, next: NextFunction): Response {
    return res.json({ test: 'ok' })
  }

  @Router({ method: 'post', path: '/login' })
  @Filter(accountFilter.login)
  public login (document: any, req: Request, res: Response, next: NextFunction): Response {
    return res.json(document)
  }
}
