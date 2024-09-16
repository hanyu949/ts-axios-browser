import { Axios } from './core/Axios'
import { extendsTo } from './helpers/util'
import {
  AxiosError as AxiosErrorOrigin,
  AxiosRequestConfig,
  AxiosRequestFunctionType
} from './types'
export * from './types'
export type AxiosError = AxiosErrorOrigin

// function createInstance(config: AxiosRequestConfig) {
//     const context = new Axios(config)
//     const instance = Axios.prototype.request.bind(context)
//     const axios: AxiosRequestFunctionType & Axios = extendsTo(instance, context)
//     return axios
// }
// export default createInstance(defaults)

const context = new Axios()
const axiosIns = context.request.bind(context)
const axios: AxiosRequestFunctionType & Axios = extendsTo(axiosIns, context)
export default axios
