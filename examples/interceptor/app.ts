import axios, { AxiosRequestConfig } from "../../src"

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = config.headers || {};
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => {
  config.headers = config.headers || {};
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use(config => {
  config.headers = config.headers || {};
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use(res => {
  res.data += '1'
  return res
})
let interceptor = axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})
axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

axios.interceptors.response.eject(interceptor)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  },
  params: {
    a:1,
    b:2
  }
}).then((res) => {
  console.log(res.data)
})