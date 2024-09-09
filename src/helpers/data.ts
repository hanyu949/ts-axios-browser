import { AxiosRequestConfig } from '../types'
import { buildHeaders } from './headers'
import { isPlainObject } from './util'

export function buildData(config: AxiosRequestConfig) {
  let { data } = config
  if (!data) return

  if (isPlainObject(data)) {
    buildHeaders(config)
    config.data = JSON.stringify(data)
  }
}
