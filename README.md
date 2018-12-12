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

const session_secret = 'kenote_secret'
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