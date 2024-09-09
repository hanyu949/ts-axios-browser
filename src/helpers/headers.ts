import { head } from 'shelljs'
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
/**
 * "connection: keep-alive
 *  content-length: 13
 *  content-type: application/json; charset=utf-8
 *  date: Mon, 09 Sep 2024 06:14:30 GMT
 *  etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"
 *  keep-alive: timeout=5
 *  x-powered-by: Express"
 * @param headers
 */
export function parseHeaders(headers: string): Record<string, string> {
  let ParsedHeaders: Record<string, string> = Object.create(null)
  headers.split('\r\n').forEach(header => {
    let [key, val] = header.split(': ')
    if (!key) return
    if (key) key = key.trim()
    if (val) val = val.trim()
    ParsedHeaders[key] = val
  })
  return ParsedHeaders
}
