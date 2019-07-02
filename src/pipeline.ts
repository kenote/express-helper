import * as path from 'path'
import * as glob from 'glob'
import { Router, RequestHandler, Application } from 'express'
import { Map } from 'immutable'
import { Controller, RouterMethod, PipelineOptions } from '../types'

/**
 * 挂载控制器管道
 * @param name 管道名称
 * @param pipeline 管道路径
 * @param app Application
 * @param options IMPOptions
 */
export function mountPipeline (name: string, pipeline: string, app: Application, options: PipelineOptions): void {
  let { root, handlers } = options || { root: '.', handlers: [] }
  let router: Router = Router()
  glob.sync(`/${pipeline}/**/*.ts`, { root }).forEach(async file => {
    let filename: string = path.basename(file).replace(/\.ts$/, '')
    if (/^(index)/.test(filename)) return
    filename = path.basename(file).replace(/([a-zA-Z0-9\-\_]{1,})\.ts$/, `./${pipeline}/$1`)
    try {
      let controller = await import(file.replace(/\.[^.]*$/, ''))
      let Control: Controller = new controller.default()
      addendRouter(Control.__DecoratedRouters, router, controller.default.__DecoratedRoot)
      handlers = [ ...handlers || [], router ]
      app.use(name, ...handlers)
    } catch (error) {
      console.error(error)
    }
  })
}

/**
 * 添加路由
 * @param maps Map<RouterMethod, RequestHandler[]>
 * @param router Router
 * @param root string
 */
export function addendRouter (maps: Map<RouterMethod, RequestHandler[]>, router: Router, root: string): void {
  let _root: string = root || ''
  for (let [config, controller] of maps) {
    router[config.method](_root + config.path, ...controller)
  }
}
