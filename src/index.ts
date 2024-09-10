import { Axios } from './core/Axios'
import { extendsTo } from './helpers/util'
import { AxiosError as AxiosErrorOrigin } from './types'
export type AxiosError = AxiosErrorOrigin

const context = new Axios()
const axiosIns = context.request.bind(context)
const axios = extendsTo(axiosIns, context)

export default axios
