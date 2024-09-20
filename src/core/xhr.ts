import { transformResponse } from '../helpers/data'
import { parseHeaders } from '../helpers/headers'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { createAxiosError } from '../helpers/error'
import { transform } from '../helpers/util'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data,
      url = '',
      method = 'get',
      headers = {},
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName
    } = config
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
      response.data = transform(response.data, response.headers, config.transformResponse)
      handleResponse(response)
    }
    console.log('CSRF', isURLSameOrigin(url), xsrfCookieName)
    if ((withCredentials || isURLSameOrigin(url)) && xsrfCookieName) {
      const xsrfValue = cookie.read(xsrfCookieName)
      console.log(xsrfValue, xsrfCookieName)
      if (xsrfValue) {
        headers[xsrfHeaderName!] = xsrfValue
      }
    }
    if (headers && data !== null) {
      Object.keys(headers).forEach(name => {
        request.setRequestHeader(name, headers[name])
      })
    }

    processCancel()

    if (withCredentials) request.withCredentials = true

    data !== null ? request.send(data) : request.send()

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise
          .then(reason => {
            request.abort()
            reject(reason)
          })
          .catch(
            /* istanbul ignore next */
            () => {
              // do nothing
            }
          )
      }
    }

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) resolve(response)
      else {
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
    }
  })
}
