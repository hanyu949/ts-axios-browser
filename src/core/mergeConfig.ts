import { isPlainObject } from '../helpers/util'
import { AxiosRequestConfig } from '../types'
/**
 * config1 = {
    method: 'get', timeout: 0,
    headers: {
      common: {
        Accept: 'application/json, text/plain'
      }
    }
  }
  config2 = {
    url: '/config/post', method: 'post',
    data: {
      a: 1
    },
    headers: {
      test: '321'
    }
  }
  config1 and config2 merge =>
  merged = {
    url: '/config/post', method: 'post',
    data: {
      a: 1
    },
    timeout: 0,
    headers: {
      common: {
        Accept: 'application/json, text/plain'
      }
      test: '321'
    }
  }
 */

interface mergeConfig<T> {
  (defaults: T, config?: T): T
}

export const mergeConfig: mergeConfig<AxiosRequestConfig> = (defaults, config) => {
  if (!config) return defaults
  Object.keys(config).forEach(key => {
    if (key !== 'headers') {
      defaults[key] = config[key]
    } else {
      mergeHeaders(defaults.headers, config.headers)
    }
  })
  return defaults
}

function mergeHeaders(
  defheaders: AxiosRequestConfig['headers'],
  headers: AxiosRequestConfig['headers']
): AxiosRequestConfig['headers'] {
  if (!headers) return defheaders
  Object.keys(headers).forEach(key => {
    defheaders![key] = headers[key]
  })
  return defheaders
}
