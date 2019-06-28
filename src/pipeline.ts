import * as path from 'path'
import * as fs from 'fs'
import { Router, RequestHandler, Application } from 'express'
import { Map } from 'immutable'
import { Controller, RouterMethod } from '../types'

/**
 * 挂载控制器管道
 * @param name 管道名称
 * @param pipeline 管道路径
 * @param app Application
 * @param handlers RequestHandler
 */
export async function mountPipeline (name: string, pipeline: string, app: Application, ...handlers: RequestHandler[]): Promise<void> {
  let pipelinePath: string = path.resolve(process.cwd(), pipeline)
  if (!fs.existsSync(pipelinePath)) return
  let files: string[] = fs.readdirSync(pipelinePath).filter( filename => /\.(ts|es|es6|js)$/.test(filename) )
  try {
    let modules: any[] = await Promise.all(files.map( file => (import(path.resolve(pipelinePath, file))) ))
    let router: Router = Router()
    for (let item of modules) {
      let Control: Controller = new item.default()
      addendRouter(Control.__DecoratedRouters, router, item.default.__DecoratedRoot)
    }
    if (handlers && handlers.length > 0) {
      app.use(name, ...handlers, router)
    }
    else {
      app.use(name, router)
    }
  } catch (error) {
    throw error
  }
}

function addendRouter (maps: Map<RouterMethod, RequestHandler[]>, router: Router, root: string): void {
  let _root: string = root || ''
  for (let [config, controller] of maps) {
    router[config.method](_root + config.path, ...controller)
  }
}
