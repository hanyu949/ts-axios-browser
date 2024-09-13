import { Axios } from './core/Axios'
import defaults from './helpers/defaults'
import { extendsTo } from './helpers/util'
import {
  AxiosError as AxiosErrorOrigin,
  AxiosRequestConfig,
  AxiosRequestFunctionType
} from './types'
export * from './types'
export type AxiosError = AxiosErrorOrigin

const context = new Axios(defaults)
const axiosIns = context.request.bind(context)
const axios: AxiosRequestFunctionType & Axios = extendsTo(axiosIns, context)

export default axios
