import { AxiosRequestConfig } from '../types'
import { buildHeaders } from './headers'
import { isPlainObject } from './util'

export function buildData(config: AxiosRequestConfig) {
  if (!config?.data) return
  let { data } = config
  if (isPlainObject(data)) {
    buildHeaders(config)
    config.data = JSON.stringify(data)
  }
}

/**
 * 这个处理其实有些问题，如果忘记写responseType应该补上就好，不用我们从框架这边做处理
 * @param data
 * @param responseType
 * @returns
 */
export function transformResponse(data: any, responseType?: XMLHttpRequestResponseType): any {
  // if (responseType !== 'json') return
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
