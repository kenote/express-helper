# express-helper
Express's Helper.

## Installation

```bash
$ yarn add kenote-express-helper
```

## Usages

### Create An Express Controller

`controller/account.ts`

```ts
import { Request, Response, NextFunction } from 'express'
import { Controller, Path, Router, Filter } from 'kenote-express-helper'
import accountFilter from '../filters/account'
import { IResponse } from '../middleware/restful'

@Path('/account')
export default class Account extends Controller {

  @Router({ method: 'get', path: '/home' })
  public home (req: Request, res: Response, next: NextFunction): Response {
    return res.json({ test: 'ok' })
  }

  @Router({ method: 'post', path: '/login' })
  @Filter(accountFilter.login)
  public login (document: any, req: Request, res: IResponse, next: NextFunction): Response {
    return res.api(document)
  }

  @Router({ method: 'get', path: '/help' })
  public help (req: Request, res: IResponse, next: NextFunction): void {
    return res.notfound()
  }
}
```

`filters/account.ts`

```ts
import { Request, Response, NextFunction } from 'express'

class Account {

  public login (req: Request, res: Response, next: NextFunction): Response | void {
    return next({ test: 'ok' })
  }
}

export default new Account()
```

`app.ts`

```ts
import * as http from 'http'
import * as express from 'express'
import { Application } from 'express'
import { mountPipeline, mountPipelineHandle } from 'kenote-express-helper'
import restful from './middleware/restful'

(async () => {
  const app: Application = express()

  app.use(... await mountPipelineHandle())

})()
```

## License

this repo is released under the [MIT License](https://github.com/kenote/express-helper/blob/master/LICENSE).