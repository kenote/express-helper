import { Request, Response, NextFunction } from 'express'

class Account {

  public login (req: Request, res: Response, next: NextFunction): Response | void {
    return next({ test: 'ok' })
  }
}

export default new Account()
