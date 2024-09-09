import { transformResponse } from './helpers/data'
import { parseHeaders } from './helpers/headers'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url, true)

    if (responseType) request.responseType = responseType

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return
      const responseHeaders = request.getAllResponseHeaders()
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: transformResponse(responseData, responseType),
        status: request.status,
        statusText: request.statusText,
        headers: parseHeaders(responseHeaders),
        config,
        request
      }
      resolve(response)
    }

    if (headers && data !== null) {
      Object.keys(headers).forEach(name => {
        request.setRequestHeader(name, headers[name])
      })
    }

    data !== null ? request.send(data) : request.send()
  })
}
