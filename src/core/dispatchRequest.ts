import { buildData } from '../helpers/data'
import { buildHeaders, flattenHeaders } from '../helpers/headers'
import { bulidURL, combineURL, isAbsoluteURL } from '../helpers/url'
import { transform } from '../helpers/util'
import { AxiosPromise, AxiosRequestConfig } from '../types'
import xhr from './xhr'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  transformUrl(config)
  transformHeaders(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformUrl(config: AxiosRequestConfig): void {
  let { url, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  bulidURL(config)
}

function transformRequestData(config: AxiosRequestConfig): void {
  buildData(config)
}

function transformHeaders(config: AxiosRequestConfig) {
  config.headers = buildHeaders(config)
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) config.cancelToken.throwIfRequested()
}

export default dispatchRequest
