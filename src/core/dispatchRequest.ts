import { buildData } from '../helpers/data'
import { buildHeaders } from '../helpers/headers'
import { bulidURL } from '../helpers/url'
import { extendsTo, flattenHeaders } from '../helpers/util'
import { AxiosPromise, AxiosRequestConfig } from '../types'
import xhr from './xhr'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  transformUrl(config)
  transformHeaders(config)
  transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformUrl(config: AxiosRequestConfig): void {
  bulidURL(config)
}

function transformRequestData(config: AxiosRequestConfig): void {
  buildData(config)
}

function transformHeaders(config: AxiosRequestConfig) {
  config.headers = buildHeaders(config)
}

export default dispatchRequest
