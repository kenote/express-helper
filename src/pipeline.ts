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
  let files: string[] = []
  glob.sync(`/${pipeline}/**/*.ts`, { root }).forEach(async file => {
    files.push(file)
    let filename: string = path.basename(file).replace(/\.ts$/, '')
    if (/^(index)/.test(filename)) return
    try {
      let controller = await import(file.replace(/\.[^.]*$/, ''))
      let Control: Controller = new controller.default()
      Control.__DecoratedRouters && addendRouter(Control.__DecoratedRouters, router, controller.default.__DecoratedRoot)
    } catch (error) {
      console.error(error)
    }
  })
  handlers = [ ...handlers || [], router ]
  app.use(name, ...handlers)
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
