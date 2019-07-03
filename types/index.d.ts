import { Request, Response, NextFunction } from 'express'
import { KenoteServerRouterMethod } from './router'
import { KenoteServerMiddlewareOptions } from './middleware'
import { KenoteServerPipelineOptions } from './pipeline'
import { Controller, Path, Router, Filter, mountPipeline, Middleware, MiddlewareSetting, RegisterMiddlewareMethod, MountController } from '../src'

export {
  Controller,
  Path,
  Router,
  Filter,
  mountPipeline,
  Middleware,
  MiddlewareSetting,
  RegisterMiddlewareMethod,
  MountController,
  IRequestHandler,
  KenoteServerRouterMethod as RouterMethod,
  KenoteServerMiddlewareOptions as MiddlewareOptions,
  KenoteServerPipelineOptions as PipelineOptions
}

/**
 * 请求处理函数 -- 经过滤器处理过
 * @param data any
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
type IRequestHandler = (data: any, req: Request, res: Response, next: NextFunction) => any
