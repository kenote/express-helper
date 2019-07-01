import { Map } from 'immutable'
import { Request, Response, NextFunction } from 'express'
import { MiddlewareOptions } from '../types'

/**
 * 配置中间件
 * @param settings MiddlewareSettings
 */
export function MiddlewareSetting (options: MiddlewareOptions) {
  return function (target: any) {
    target.prototype.__ResponseHeaders = options.header || []
    target.prototype.__RequestParameters = options.parameter
  }
}

/**
 * 中间件基类
 */
export class Middleware {

  /**
   * 中间件方法
   */
  public __ResponseMethods: Map<string, (response: Response) => any>

  /**
   * 头部信息
   */
  private __ResponseHeaders: string[][]

  /**
   * Request 参数
   */
  private __RequestParameters: Record<string, any>

  /**
   * 响应中间件事件
   */
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
      for (let [ name, func ] of this.__ResponseMethods) {
        response[name] = func(response)
      }
      return next()
    }
  }
}

/**
 * 注册中间件方法
 */
export function RegisterMiddlewareMethod (): any {
  return (target: Middleware, propertyKey: string, descriptor: PropertyDescriptor): void => {
    if (!target.__ResponseMethods) {
      target.__ResponseMethods = Map()
    }
    target.__ResponseMethods = target.__ResponseMethods.set(propertyKey, target[propertyKey])
  }
}
