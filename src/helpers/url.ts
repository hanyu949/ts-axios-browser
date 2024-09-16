import { AxiosRequestConfig } from '../types'
import { isDate, isPlainObject } from './util'

/**
 * 如果params有请求数据 将数据转换为字符串放入URL中
 * 1. 数组情况 params: {foo: [1,2,3]} => foo[]=1&foo[]=2&foo[]=3
 * 2. 字符串情况 params: {foo: 'bar', bar: 'baz'} => foo=bar&bar=baz
 * 3. 特殊字符 对于字符 @:$,[] ，允许出现在 url 中
 * 4. Date 类型 date 后面拼接的是 date.toISOString() 的结果。
 * 5. 空值忽略
 * 6. 丢弃 url 中的哈希标记
 * 7. 保留 url 中已存在的参数
 * 注意: 在url本身有请求参数的情况
 *      例url: /api/persion?id=1&age=18, 保留url参数，并将params参数放在后面
 * @param config: AxiosRequestConfig
 * @returns void
 */
export function bulidURL(config: AxiosRequestConfig): void {
  if (!config?.params || !config?.url) {
    return
  }
  let { params, url } = config
  let paramsArray: string[] = []

  Object.keys(params).forEach(key => {
    let param = params[key]
    if (param === null || param === undefined) return
    let token: string = ''
    if (Array.isArray(param) && param.length !== 0)
      token = param.map(i => `${key}[]=${i}`).join('&')
    else if (isDate(param)) token = param.toISOString()
    else if (isPlainObject(param)) token = `${key}=${JSON.stringify(param)}`
    else if (typeof param === 'string') token = `${key}=${param}`
    else if (typeof param === 'number') token = `${key}=${param}`
    if (token) paramsArray.push(token)
  })

  paramsArray = enCodeURL(paramsArray)

  config.url = url.indexOf('#') !== -1 ? url.slice(0, url.indexOf('#')) : url

  if (url.indexOf('?') !== -1) {
    config.url += '&' + paramsArray.join('&')
  } else {
    config.url += '?' + paramsArray.join('&')
  }

  // config.url = enCodeURL(config.url)
}

function enCodeURL(paramsArr: string[]): string[] {
  return paramsArr.map(i => encodeURI(i))
}
