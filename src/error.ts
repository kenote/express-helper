import util from 'util'

export interface errorInfo {
  code: number;
  message?: string;
}

export interface IError extends Error {
  code?: number
}

interface errorSetting {
  code: object;
  message: object;
}

export class ExpressError {
  public __ErrorCode: object;
  public __ErrorMessage: object;

  public ErrorInfo = (code: number, opts?: any, json?: boolean) => {
    let info: errorInfo = { code }
    for (let e in this.__ErrorCode) {
      if (this.__ErrorCode[e] === code) {
        info.message = this.__ErrorMessage[e]
        break
      }
    }
    if (Array.isArray(opts)) {
      opts.splice(0, 0, info.message)
      info.message = util.format(opts[0], ...opts.slice(1))
    }
    if (json) return info
    let error: IError = new Error(info.message)
    error.code = info.code
    return error
  }

  public CustomError = (e: IError): boolean | 0 | undefined => e.code && e.code >= 1000
}

export function ErrorSetting (setting: errorSetting) {
  return function (target: any) {
    target.prototype.__ErrorCode = setting.code
    target.prototype.__ErrorMessage = setting.message
  }
}