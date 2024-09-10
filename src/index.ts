import { Axios } from './core/Axios'
import { extendsTo } from './helpers/util'
import { AxiosError as AxiosErrorOrigin } from './types'
export type AxiosError = AxiosErrorOrigin

const newAxios = new Axios()
const b = newAxios.request.bind(newAxios)
const axiosINS = extendsTo(b, newAxios)

export default axiosINS
