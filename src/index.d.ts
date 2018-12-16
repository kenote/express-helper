import * as express from 'express'
import * as session from 'express-session'
import { ServerSettings as serverSettings, ExpressServer as expressServer } from './server'
import { 
  RouterMethods as routerMethods, 
  RouterController as routerController, 
  ControllerMount as controllerMount,
  Router as router,
  Filter as filter
} from './router'
import { ExpressError as expressError, ErrorSetting as errorSetting } from './error'

export declare class ExpressServer extends expressServer {}

export declare const ExpressSession: typeof session

export declare const ServerSettings: typeof serverSettings

export declare class RouterMethods extends routerMethods {}

export declare class RouterController extends routerController {}

export declare const ControllerMount: typeof controllerMount

export declare const Router: typeof router

export declare const Filter: typeof filter

export declare class ExpressError extends expressError {}

export declare const ErrorSetting: typeof errorSetting

export declare interface IError extends Error {
  code?: number
}

export declare interface errorInfo {
  code: number;
  message?: string;
}