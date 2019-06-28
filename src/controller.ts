import { RequestHandler } from 'express'
import { Map } from 'immutable'
import { RouterMethod } from '../types'

/**
 * 控制器基础类
 */
export class Controller {

  /**
   * 路由字典
   */
  public __DecoratedRouters: Map<RouterMethod, RequestHandler[]>

  /**
   * 过滤器字典
   */
  public __DecoratedFilters: Map<string, any>

  /**
   * 控制器根路径
   */
  public __DecoratedRoot: string = ''

}

/**
 * 类装饰器 -- 设定控制器根路径
 * @param root string
 */
export function Path (root: string): any {
  return function (target: any): void {
    target.__DecoratedRoot = root
  }
}



