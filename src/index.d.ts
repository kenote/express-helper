import * as express from 'express'
import * as session from 'express-session'
import { serverSettings, ExpressServer as expressServer } from './server'
import { RouterMethods as routerMethods, RouterController as routerController, RouterMethodSetting } from './router'

export declare class ExpressServer extends expressServer {}

export declare const ExpressSession: typeof session

export declare const ServerSettings: (value: serverSettings) => any

export declare class RouterMethods extends routerMethods {}

export declare class RouterController extends routerController {}

export declare const ControllerMount: (...controller: Array<RouterMethods | any>) => any

export declare const Router: (...config: RouterMethodSetting[]) => any

export declare const Filter: (...filter: Array<any>) => any