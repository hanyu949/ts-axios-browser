import { Axios } from './core/Axios'
import { extendsTo } from './helpers/util'
import { AxiosError as AxiosErrorOrigin, AxiosRequestFunctionType } from './types'
export * from './types'
export type AxiosError = AxiosErrorOrigin

const context = new Axios()
const axiosIns = context.request.bind(context)
const axios: AxiosRequestFunctionType & Axios = extendsTo(axiosIns, context)

export default axios
