import { AxiosError } from '../helpers/error'
import InterceptorManager from '../helpers/interceptor'
import {
  AxiosDefaultConfig,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RejectedFn,
  ResolvedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
// import { mergeConfig } from './mergeConfig'
interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}
interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}
export class Axios {
  interceptors: Interceptors
  defaults?: AxiosDefaultConfig

  constructor(defaults?: AxiosDefaultConfig) {
    if (defaults) this.defaults = defaults
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  private margeConfigs(
    defaults: AxiosDefaultConfig,
    configs: AxiosRequestConfig
  ): AxiosRequestConfig {
    let margedConfig: AxiosRequestConfig = { headers: {} }
    let { headers: defualtsHeaders = {} } = defaults
    let { headers: configHeaders = {}, method = 'get' } = configs

    // 将config中的属性覆盖到margedConfig (key === 'headers')
    Object.keys(configs).forEach(key => {
      if (key === 'headers') return
      margedConfig[key] = defaults[key]
      margedConfig[key] = configs[key]
    })
    // 把defualtsHeaders部分，按照common和method的区分 填入margedConfig
    Object.keys(defualtsHeaders).forEach(key => {
      if (key === 'common') {
        const commonObj = defualtsHeaders[key] ?? {}
        Object.keys(commonObj).forEach(key => {
          margedConfig.headers![key] = commonObj[key]
        })
      } else if (key === method) {
        margedConfig.headers = Object.assign({}, margedConfig.headers, defualtsHeaders[key])
      }
    })
    // 把requestConfig中 自定义的headers，和margedConfig.headers合并
    margedConfig.headers = Object.assign({}, margedConfig.headers, configHeaders)

    return margedConfig
  }

  request<T = any>(
    param1: string | AxiosRequestConfig,
    param2?: AxiosRequestConfig
  ): AxiosPromise<T> {
    let config: string | AxiosRequestConfig
    if (typeof param1 === 'string') {
      const url = param1
      config = param2 || ({} as AxiosRequestConfig)
      config.url = url
    } else {
      config = param1
    }
    if (typeof config === 'string') throw new AxiosError('methods unkonw', { url: config })
    this.margeConfigs(this.defaults ?? {}, config)
    let chain: PromiseChain[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise: Promise<AxiosRequestConfig | AxiosResponse<T>> = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise as Promise<AxiosResponse<T>>
  }
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData('get', url, config)
  }
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData('head', url, config)
  }
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData('options', url, config)
  }
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithData('post', url, data, config)
  }
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithData('put', url, data, config)
  }
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithData('patch', url, data, config)
  }
  _requestMethodWithData(
    method: Method,
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(Object.assign(config || {}, { method, url, data }))
  }
  _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(Object.assign(config || {}, { method }, { url }))
  }
}
