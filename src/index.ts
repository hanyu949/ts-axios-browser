import { Axios } from './core/Axios'
import defaults from './helpers/defaults'
import { extendsTo } from './helpers/util'
import {
  AxiosDefaultConfig,
  AxiosError as AxiosErrorOrigin,
  AxiosRequestFunctionType
} from './types'
export * from './types'
export type AxiosError = AxiosErrorOrigin

function createInstance(config: AxiosDefaultConfig) {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  const axios: AxiosRequestFunctionType & Axios = extendsTo(instance, context)
  return axios
}
export default createInstance(defaults)

// const context = new Axios(defaults)
// const axiosIns = context.request.bind(context)
// const axios: AxiosRequestFunctionType & Axios = extendsTo(axiosIns, context)
// export default axios
