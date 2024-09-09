import { transformResponse } from './helpers/data'
import { parseHeaders } from './helpers/headers'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'
import { createAxiosError } from './helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url, true)

    if (responseType) request.responseType = responseType
    if (timeout) request.timeout = timeout

    request.ontimeout = () =>
      reject(createAxiosError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    request.onerror = () => reject(createAxiosError('Network Error', config, null, request))
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return
      if (request.status === 0) return
      const responseHeaders = request.getAllResponseHeaders()
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: transformResponse(responseData, request.responseType),
        status: request.status,
        statusText: request.statusText,
        headers: parseHeaders(responseHeaders),
        config,
        request
      }
      handleResponse(response)
    }

    if (headers && data !== null) {
      Object.keys(headers).forEach(name => {
        request.setRequestHeader(name, headers[name])
      })
    }

    data !== null ? request.send(data) : request.send()

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) resolve(response)
      else
        reject(
          createAxiosError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
    }
  })
}
