import { RequestHandler } from 'express'

/**
 * 控制器管道选项
 */
export interface KenoteServerPipelineOptions {

  /**
   * 根目录
   */
  root               : string

  /**
   * 前置响应器
   */
  handlers          ?: RequestHandler[]
}