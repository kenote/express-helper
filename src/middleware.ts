import { Request, Response, NextFunction } from 'express'

interface middlewareSetting {
  header: Array<string[]>
}

export function MiddlewareSetting (setting: middlewareSetting) {
  return function (target: any) {
    target.prototype.__ResponseHeaders = setting.header || []
  }
}

export class Middleware {
  public __ResponseMethods: Array<{ name: string, func: Function }>;
  public __ResponseHeaders: Array<string[]>;

  public hendler (): any {
    return (request: Request, response: Response, next: NextFunction): void => {
      for (let [name, value] of this.__ResponseHeaders) {
        response.setHeader(name, value)
      }
      for (let { name, func } of this.__ResponseMethods) {
        response[name] = func(response)
      }
      return next()
    }
  }
}

export function RegisterMiddlewareMethod (): any {
  return (target: Middleware, propertyKey: string, descriptor: PropertyDescriptor): void => {
    if (!target.__ResponseMethods) {
      target.__ResponseMethods = []
    }
    target.__ResponseMethods.push({ name: propertyKey, func: target[propertyKey]})
  }
}
