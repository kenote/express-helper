import { PathParams } from 'express-serve-static-core'

/**
 * 路由配置
 * @param name string
 * @param method 'get' | 'post' | 'put' | 'patch' | 'delete' | 'copy' | 'head' | 'options' | 'use'
 * @param path PathParams
 */
export interface KenoteServerRouterMethod {

  /**
   * 路由名称
   */
  name              ?: string

  /**
   * 请求方法
   */
  method             : 'get' | 'post' | 'put' | 'patch' | 'delete' | 'copy' | 'head' | 'options' | 'use'

  /**
   * 请求路径
   */
  path               : PathParams

}