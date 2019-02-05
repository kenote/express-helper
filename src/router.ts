import * as express from 'express'
import { PathParams } from 'express-serve-static-core'
import { Map } from 'immutable'

export interface RouterMethodSetting {
  name?: string
  method: 'get' | 'post' | 'put' | 'head' | 'delete' | 'use'
  path: PathParams
}

interface IRequestHandler {
  (data: any, req: express.Request, res: express.Response, next: express.NextFunction): any
}

export class RouterMethods {
  public __DecoratedRouters: Map<RouterMethodSetting, express.RequestHandler[]>
  public __DecoratedFilters: Map<string, any>
}

export function Router (...config: RouterMethodSetting[]): any {
  return (target: RouterMethods, propertyKey: string, descriptor: PropertyDescriptor): void => {
    if (!target.__DecoratedRouters) {
      target.__DecoratedRouters = Map()
    }
    let requestHandler: Array<any> = [target[propertyKey]]
    if (target.__DecoratedFilters && target.__DecoratedFilters.get(propertyKey)) {
      let filter: Array<any> = target.__DecoratedFilters.get(propertyKey)
      requestHandler = filter.concat(requestHandler)
    }
    if (Array.isArray(config)) {
      config.forEach((item: RouterMethodSetting):void => {
        item.name = propertyKey
        target.__DecoratedRouters = target.__DecoratedRouters.set(item, requestHandler)
      })
    }
    else {
      (<RouterMethodSetting> config).name = propertyKey
      target.__DecoratedRouters = target.__DecoratedRouters.set(config, requestHandler)
    }
    
  }
}

export function Filter (...filter: Array<express.RequestHandler | IRequestHandler>): any {
  return (target: RouterMethods, propertyKey: string, descriptor: PropertyDescriptor): void => {
    if (!target.__DecoratedFilters) {
      target.__DecoratedFilters = Map()
    }
    target.__DecoratedFilters = target.__DecoratedFilters.set(propertyKey, filter)
  }
}

export class RouterController {
  private __DecoratedRouters: Map<RouterMethodSetting, express.RequestHandler[]>;

  protected addend (controller: RouterMethods): void {
    if (!this.__DecoratedRouters) {
      this.__DecoratedRouters = Map()
    }
    this.__DecoratedRouters = this.__DecoratedRouters.merge(controller.__DecoratedRouters)
  }

  public handler (): express.Router {
    let router: express.Router = express.Router()
    if (!this.__DecoratedRouters) {
      this.__DecoratedRouters = Map()
    }
    for (let [config, controller] of this.__DecoratedRouters) {
      router[config.method](config.path, controller)
    }
    return router;
  }
}

export function ControllerMount (...controller: Array<RouterMethods | any>): any {
  return function (target: any): void {
    if (!target.__DecoratedRouters) {
      target.prototype.__DecoratedRouters = Map()
    }
    controller.forEach((item: RouterMethods | any) => {
      target.prototype.__DecoratedRouters = target.prototype.__DecoratedRouters.merge(new item().__DecoratedRouters)
    })
  }
}