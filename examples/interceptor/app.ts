import axios from "../../src"

/**
 * 请求响应拦截器 
 * Axios拦截器的配置在全局生效 所以不需要在每个请求前都放上拦截器，这样的结果会和预期不一样
 * 测试interceptor:
 * axios.interceptors.request.use()
 * 功能：
 * 1. 接受一个函数，request函数的参数是config response的参数是respons
 * 2. 依次执行 请求拦截器(config) => 请求(config) => 响应拦截器(response)
 * 3. axios.interceptors.request.eject(id: num) 取消拦截器
 * 
 * 测试用例
 * 功能一测试: 
 * 1. 接受的参数后，是否能反应到config/data对象中
 * 功能二测试:
 * 1. 多次添加拦截器，是否可以依次执行，累计对参数的操作
 * 功能三测试:
 * 1. 添加多个拦截器，eject其中一个，看返回结果是否和预期的一样
 */
function request() {
  return axios({
    url: '/interceptor/get',
    method: 'get',
    headers: {
      test: ''
    },
    params: {
      a:1,
      b:2
    }
  })
}

/**
 * 功能一测试: 
 * 1. 接受的参数后，是否能反应到config/data对象中
 * 
 * 9.14 通过
 */
function interceptorTest1() {
  // 看network tab中的requestHeaders
  axios.interceptors.request.use(config => {
    config.headers!.test = "config/data"
    return config
  })
  // 看console.log()
  axios.interceptors.response.use(res => {
    res.data["interceptorTest1"] = "接受的参数, 反应到了config/data对象中."
    return res
  })
  request()
  // res.config.headers 预期："config/data"
  // console.log('拦截器功能一测试1是否能反应到config/data对象中 config =======> 预期："config/data"', res.config.headers)
  // res.data 预期："接受的参数, 反应到了config/data对象中."
  // console.log('拦截器功能一测试1是否能反应到config/data对象中 response =======> 预期："接受的参数, 反应到了config/data对象中."', res.data)
}

/**
 * 功能二测试: 
 * 1. 多次添加拦截器，是否可以依次执行，累计对参数的操作
 * 
 * 9.14 通过
 */
async function interceptorTest2() {
  axios.interceptors.request.use(config => {
    config.headers!.test += " interceptorTest2 1time "
    return config
  })
  axios.interceptors.request.use(config => {
    config.headers!.test += " interceptorTest2 2time "
    return config
  })
  axios.interceptors.request.use(config => {
    config.headers!.test += " interceptorTest2 3time "
    return config
  })
  
  axios.interceptors.response.use(res => {
    res.data = {
      test: "interceptorTest2.response 1"
    }
    return res
  })
  axios.interceptors.response.use(res => {
    res.data.test += " interceptorTest2.response 2"
    return res
  })
  axios.interceptors.response.use(res => {
    res.data.test += " interceptorTest2.response 3"
    return res
  })

  const res = await request()
  // res.config.headers 预期： 3time  2time  1time 
  // console.log('功能二测试1. 多次添加拦截器，是否可以依次执行，累计对参数的操作 config =======> 预期： 3time  2time  1time ', res.config.headers)
  // res.data 预期：res.data.test = 123
  // console.log('功能二测试1. 多次添加拦截器，是否可以依次执行，累计对参数的操作 response =======> 预期：res.data.test = 123', res.data)
  return res
}

/**
 * 功能三测试: 
 * 1. 添加多个拦截器，eject其中一个，看返回结果是否和预期的一样
 * 
 * 思路和测试2一样，在添加完拦截器后 通过eject删除一个
 * 
 * 9.14 通过
 */
async function interceptorTest3() {
  axios.interceptors.request.use(config => {
    config.headers!.test += " interceptorTest3.request 1time "
    return config
  })
  const request2timer = axios.interceptors.request.use(config => {
    config.headers!.test += " interceptorTest3.request 2time "
    return config
  })
  axios.interceptors.request.use(config => {
    config.headers!.test += " interceptorTest3.request 3time "
    return config
  })
  
  axios.interceptors.response.use(res => {
    res.data.test += "interceptorTest3.response 1   "
    return res
  })
  const response2timer = axios.interceptors.response.use(res => {
    res.data.test += "interceptorTest3.response 2   "
    return res
  })
  axios.interceptors.response.use(res => {
    res.data.test += "interceptorTest3.response 3"
    return res
  })

  axios.interceptors.response.eject(response2timer)
  const res = await request()
  // res.config.headers 预期： 3time  1time 
  console.log('功能3测试1. 多次添加拦截器，是否可以依次执行，累计对参数的操作 config =======> 预期： 3time  1time ', res.config.headers)
  // res.data 预期：res.data.test = 13
  console.log('功能3测试1. 多次添加拦截器，是否可以依次执行，累计对参数的操作 response =======> 预期：res.data.test = 13', res.data)
  return res
}


// 打开下面任意一个注释测试
interceptorTest1()
// interceptorTest2()
// interceptorTest3()
