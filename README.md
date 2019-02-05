# express-helper
Express's Helper.

## Installation

```bash
$ yarn add kenote-express-helper
```

## Usages

### Create An Express Controller

`api/sign.ts`

```ts
import { Request, Response, NextFunction } from 'express'
import { Router, RouterMethods, Filter } from 'kenote-express-helper'

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

`api/index.ts`

```ts
import { RouterController, ControllerMount } from 'kenote-express-helper'
import Sign from './sign'

@ControllerMount(
  Sign
)
class Controller extends RouterController {}

export default new Controller()
```

### Create An Express Error

`error/index.ts`

```ts
import { ExpressError, ErrorSetting } from 'kenote-express-helper'

const Code: object = {
  ERROR_STATUS_NULL: 0
}

const Message: object = {
  ERROR_STATUS_NULL: 'Request Success!'
}

@ErrorSetting({
  code: Code,
  message: Message
})
class MyError extends ExpressError {
  
}

export default new ExpressError()
```

`app.ts`

```ts
import MyError from '../error'

MyError.ErrorInfo(0)
/*
{
  code: 0,
  message: 'Request Success!'
}
*/
MyError.__ErrorCode.ERROR_STATUS_NULL
// 0
```

### Create An Express Middleware

`middleware/restful.ts`

```ts
import { Response } from 'express'
import { IError, errorInfo, Middleware, MiddlewareSetting, RegisterMiddlewareMethod } from 'kenote-express-helper'

@MiddlewareSetting({
  header: [
    ['Access-Control-Allow-Origin', '*'],
    ['Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'],
    ['Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization']
  ]
})
class Restful extends Middleware {

  @RegisterMiddlewareMethod()
  public api (response: Response) {
    return (data: any): Response => {
      ...
      return response.json(data)
    }
  }

}

export default new Restful()
```

## License

this repo is released under the [MIT License](https://github.com/kenote/express-helper/blob/master/LICENSE).