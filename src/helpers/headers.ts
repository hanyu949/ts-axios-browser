import { AxiosRequestConfig } from '../types'

export function buildHeaders(config: AxiosRequestConfig): void {
  const defaultContentType = 'Content-Type'
  const defaultJsonCOntentType = 'application/json;charset=utf-8'
  if (!config.headers) {
    config.headers = {}
    config.headers[defaultContentType] = defaultJsonCOntentType
  } else {
    normalizeHeaderName(config.headers, defaultContentType)
  }
}

function normalizeHeaderName(headers: Record<string, string>, normalizeHeaderName: string) {
  Object.keys(headers).forEach(name => {
    if (name !== normalizeHeaderName && name.toUpperCase() === normalizeHeaderName.toUpperCase()) {
      headers[normalizeHeaderName] = headers[name]
      delete headers[name]
    }
  })
}
