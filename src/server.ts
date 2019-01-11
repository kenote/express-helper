import * as http from 'http'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as methodOverride from 'method-override'
import * as compress from 'compression'

export interface serverSettings {
  Host?: string;
  Port?: number;
}

export class ExpressServer {

  private settings: serverSettings;
  protected appliction: express.Application;

  constructor (Express: any = express) {
    this.appliction = Express()
    this.appliction.use((<any>bodyParser).json({ limit: '1mb' }))
    this.appliction.use((<any>bodyParser).urlencoded({ extended: true, limit: '1mb' }))
    this.appliction.use(methodOverride())
    this.appliction.use(compress())
  }

  public start (): void {
    let server: http.Server = http.createServer(this.appliction)
    let { Host, Port } = this.settings
    server.listen(Port || 3000, Host || 'loclhost', (err: Error): void => {
      if (err) throw err
      console.log(`Service running in %s environment, PORT: %d ...`, process.env.NODE_ENV || 'development', Port || 3000)
    })
  }
}

export function ServerSettings (value: serverSettings): any {
  return function (target: any): void {
    target.prototype.settings = <serverSettings> value
  }
}