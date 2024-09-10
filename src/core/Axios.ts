import { AxiosInstance, AxiosPromise, AxiosRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export class Axios implements AxiosInstance {
  request(param1: string | AxiosRequestConfig, param2?: AxiosRequestConfig): AxiosPromise {
    if (typeof param1 === 'string') {
      const url = param1
      const config = param2 || ({} as AxiosRequestConfig)
      config.url = url
      return dispatchRequest(config)
    } else {
      const config = param1
      return dispatchRequest(config)
    }
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }
  _requestMethodWithData(
    method: Method,
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(Object.assign(config || {}, method, url, data))
  }
  _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(Object.assign(config || {}, { method }, { url }))
  }
}
