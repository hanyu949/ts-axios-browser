import { buildData } from '../helpers/data'
import { bulidURL } from '../helpers/url'
import { AxiosPromise, AxiosRequestConfig } from '../types'
import xhr from './xhr'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  transformUrl(config)
  transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): void {
  bulidURL(config)
}

function transformRequestData(config: AxiosRequestConfig): void {
  buildData(config)
}

export default dispatchRequest
