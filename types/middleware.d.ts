
/**
 * 配置中间件参数
 */
export interface KenoteServerMiddlewareOptions {

  /**
   * 设置头部信息
   */
  header             : Array<string[]>

  /**
   * 设置参数
   */
  parameter         ?: Record<string, any>

}