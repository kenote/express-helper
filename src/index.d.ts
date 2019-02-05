import { RouterMethods as __RouterMethods, RouterController as __RouterController, ControllerMount as __ControllerMount, Router as __Router,Filter as __Filter } from './router'
import { ExpressError as __ExpressError, ErrorSetting as __ErrorSetting, IError as __IError, errorInfo as __errorInfo } from './error'
import { Middleware as __Middleware, MiddlewareSetting as __MiddlewareSetting, RegisterMiddlewareMethod as __RegisterMiddlewareMethod } from './middleware'

export declare class RouterMethods extends __RouterMethods {}

export declare class RouterController extends __RouterController {}

export declare const ControllerMount: typeof __ControllerMount

export declare const Router: typeof __Router

export declare const Filter: typeof __Filter

export declare class ExpressError extends __ExpressError {}

export declare const ErrorSetting: typeof __ErrorSetting

export declare interface IError extends __IError {}

export declare interface errorInfo extends __errorInfo {}

export declare class Middleware extends __Middleware {}

export declare const MiddlewareSetting: typeof __MiddlewareSetting

export declare const RegisterMiddlewareMethod: typeof __RegisterMiddlewareMethod