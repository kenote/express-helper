import { Map } from 'immutable'
import { RouterMethod } from '../types'
import { Controller } from './'

/**
 * 类方法装饰器 -- 绑定路由
 * @param config RouterMethod
 */
export function Router (...config: RouterMethod[]): any {
  return (target: Controller, propertyKey: string, descriptor: PropertyDecorator): void => {
    if (!target.__DecoratedRouters) {
      target.__DecoratedRouters = Map()
    }
    let requestHandler: any[] = [target[propertyKey]]
    if (target.__DecoratedFilters && target.__DecoratedFilters.get(propertyKey)) {
      let filter: any[] = target.__DecoratedFilters.get(propertyKey)
      requestHandler = [ ...filter, ...requestHandler ]
    }
    if (Array.isArray(config)) {
      config.forEach( (item: RouterMethod): void => {
        item.name = propertyKey
        item.path = item.path
        target.__DecoratedRouters = target.__DecoratedRouters && target.__DecoratedRouters.set(item, requestHandler)
      })
    }
    else {
      let item: RouterMethod = <RouterMethod> config
      item.name = propertyKey
      item.path = item.path
      target.__DecoratedRouters = target.__DecoratedRouters.set(item, requestHandler)
    }
  }
}
