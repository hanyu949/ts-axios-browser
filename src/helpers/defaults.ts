import { AxiosRequestConfig } from '../types'

/**
 * 默认配置，它包含默认请求的方法、超时时间，以及 headers 配置。
 */
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers![method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers![method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
