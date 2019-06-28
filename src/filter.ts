import { RequestHandler } from 'express'
import { Map } from 'immutable'
import { IRequestHandler } from '../types'
import { Controller } from './'

/**
 * 类方法装饰器 -- 绑定过滤器
 * @param filter RequestHandler | IRequestHandler
 */
export function Filter (...filter: Array<RequestHandler | IRequestHandler>): any {
  return (target: Controller, propertyKey: string, descriptor: PropertyDescriptor): void => {
    if (!target.__DecoratedFilters) {
      target.__DecoratedFilters = Map()
    }
    target.__DecoratedFilters = target.__DecoratedFilters.set(propertyKey, filter)
  }
}
