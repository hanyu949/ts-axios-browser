import { head } from 'shelljs'
import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  const { data = null, url, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  if (headers && data !== null) {
    Object.keys(headers).forEach(name => {
      request.setRequestHeader(name, headers[name])
    })
  }

  data !== null ? request.send(data) : request.send()
}
