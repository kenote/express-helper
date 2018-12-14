# express-helper
Express's Helper.

## Installation

```bash
$ yarn add @kenote/express-helper
```

## Usages

### Create An Express Server

```ts
import * as express from 'express'
import { ExpressServer, ExpressSession, ServerSettings } from '@kenote/express-helper'
import * as connectRedis from 'connect-redis'
import * as passport from 'passport'

const session_secret: string = 'kenote_secret'
const RedisStore: connectRedis.RedisStore = connectRedis(ExpressSession)

@ServerSettings({
  Host: '0.0.0.0',
  Port: 4000,
  secret: session_secret,
  session: {
    secret: <string> session_secret,
    store: new RedisStore({
      host: '127.0.0.1',
      port: 6379,
      db: 0
    }),
    resave: true,
    saveUninitialized: true
  }
})
class Server extends ExpressServer {

  constructor (Express) {
    super(Express)
    
    this.appliction.use(passport.initialize())
    this.appliction.use(passport.session())
  }

}

new Server(express).start()
```

### Create An Express Controller

```ts
// api/sign.ts
import { Request, Response, NextFunction } from 'express'
import { Router, RouterMethods, Filter } from '@kenote/express-helper'

export default class Sign extends RouterMethods {

  @Router(
    { method: 'get', path: '/accesstoken' },
    { method: 'get', path: '/accesstoken/:id' }
  )
  @Filter(
    (req: Request, res: Response, next: NextFunction): void => {
      return next(req.params)
    },
    (data: any, req: Request, res: Response, next: NextFunction): void => {
      return next({...data, name: 'accessToken'})
    },
  )
  public async accessToken (data: any, req: Request, res: IResponse, next: NextFunction): Promise<Response> {
    
    return await res.json(data)
  }

  @Router(
    { method: 'post', path: '/login' }
  )
  public async login (req: Request, res: Response, next: NextFunction): Promise<Response> {
    
    return await res.json(data)
  }
}
```

```ts
// api/index.ts
import { RouterController, ControllerMount } from '@kenote/express-helper'
import Sign from './sign'

@ControllerMount(
  Sign
)
class Controller extends RouterController {}

export default new Controller()
```

```ts
// app.ts
...
import api from './api'

@ServerSettings({
  ...
})
class Server extends ExpressServer {

  constructor (Express) {
    super(Express)
    ...
    this.appliction.use('/api', api.handler())
  }

}
...
```