import { Request, Response, NextFunction } from 'express'
import { KenoteServerRouterMethod } from './router'
import { KenoteServerMiddlewareOptions } from './middleware'
import { Controller, Path, Router, Filter, mountPipeline, mountPipelineHandle, Middleware, MiddlewareSetting, RegisterMiddlewareMethod } from '../src'

export {
  Controller,
  Path,
  Router,
  Filter,
  mountPipeline,
  mountPipelineHandle,
  Middleware,
  MiddlewareSetting,
  RegisterMiddlewareMethod,
  IRequestHandler,
  KenoteServerRouterMethod as RouterMethod,
  KenoteServerMiddlewareOptions as MiddlewareOptions
}

/**
 * 请求处理函数 -- 经过滤器处理过
 * @param data any
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
type IRequestHandler = (data: any, req: Request, res: Response, next: NextFunction) => any
