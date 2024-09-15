import { AxiosRequestConfig } from '../types'
import { isPlainObject } from './util'

export function buildData(config: AxiosRequestConfig) {
  if (!config?.data) return
  let { data } = config
  if (isPlainObject(data)) {
    config.data = JSON.stringify(data)
  }
}

/**
 * 在我们不去设置 responseType 的情况下，当服务端返回给我们的数据是字符串类型，我们可以尝试去把它转换成一个 JSON 对象。
 * @param data
 * @param responseType
 * @returns
 */
export function transformResponse(data: any, responseType?: XMLHttpRequestResponseType): any {
  if (typeof data === 'string' && responseType !== 'json') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
