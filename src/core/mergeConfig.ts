import { AxiosRequestConfig } from '../types'

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
