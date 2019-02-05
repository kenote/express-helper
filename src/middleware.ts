import { Request, Response, NextFunction } from 'express'

interface middlewareSetting {
  header: Array<string[]>
  parameter?: {
    [propsName: string]: any
  }
}

export function MiddlewareSetting (setting: middlewareSetting) {
  return function (target: any) {
    target.prototype.__ResponseHeaders = setting.header || []
    target.prototype.__RequestParameters = setting.parameter
  }
}

export class Middleware {
  public __ResponseMethods: Array<{ name: string, func: Function }>
  private __ResponseHeaders: Array<string[]>
  private __RequestParameters: {
    [propsName: string]: any
  };

  public hendler (): any {
    return (request: Request, response: Response, next: NextFunction): void => {
      for (let [name, value] of this.__ResponseHeaders) {
        response.setHeader(name, value)
      }
      if (this.__RequestParameters) {
        for (let parameter in this.__RequestParameters) {
          request[parameter] = this.__RequestParameters[parameter]
        }
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
