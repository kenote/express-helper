import * as session from 'express-session'
import { serverSettings, ExpressServer as expressServer } from './server'

export declare class ExpressServer extends expressServer {}

export declare const ExpressSession: typeof session

export declare const ServerSettings: (value: serverSettings) => (target: any) => void