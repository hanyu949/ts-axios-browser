import axios, { AxiosRequestConfig } from "../../src"

/**
 * 为所有的请求方法拓展接口
 * 功能1 将导出的Axios拓展为一个混合对象，既可以作为函数，也可以调用.get等方法使用
 * axios.request(config)
 * axios.get(url[, config])
 * axios.delete(url[, config])
 * axios.head(url[, config])
 * axios.options(url[, config])
 * axios.post(url[, data[, config]])
 * axios.put(url[, data[, config]])
 * axios.patch(url[, data[, config]])
 * 测试可以正常发出请求
 * 
 * 功能2 函数的重载
 * 下面两个返回结果应该是一样的
 * post:
 * axios('/extend/post', {method: 'post',data: {msg: 'hello'}})
 * axios({url: '/extend/post',method: 'post',data: {msg: 'hello'}})
 * get:
 * axios('/extend/get', {method: 'get', params: {msg: 'hello'}})
 * axios({url: '/extend/get', method: 'get', params: {msg: 'hello'}})
 * 
 * 功能3 响应数据支持泛型
 * function getXXX<T>
 *   return axios.get<ResponseData<T>>('/somepath')
 */

/**
 * 功能1 测试
 * 预期结果可以正常发出请求
 * 
 * 通过
 */
function ExtendTest1() {
  const config = (method?, params?, data?): AxiosRequestConfig => {
    return {
      method,
      params,
      data
    }
  }
  axios.request({url: '/extend/get', ...config('get', {params: '测试extend get方法'})})
  axios.get('/extend/get', config('get', {params: '测试extend get方法'}))
  axios.delete('/extend/delete', config('delete', {params: '测试extend delete方法'}))
  axios.head('/extend/head', config('head', {params: '测试extend head方法'}))
  axios.options('/extend/options', config('options', {params: '测试extend options方法'}))
  axios.post('/extend/post',  {method: 'post',data: {msg: 'hello'}})
  axios.put('/extend/put', config('put', null, {data: '测试extend put方法'}))
  axios.patch('/extend/patch', config('patch', null, {data: '测试extend patch方法'}))
}


/**
 * 功能2 测试
 * 下面两个返回结果应该是一样的
 * 
 * 通过
 */
function ExtendTest2() {
  // post:
  axios('/extend/post', {method: 'post',data: {msg: 'hello'}})
  axios({url: '/extend/post',method: 'post',data: {msg: 'hello'}})
  // get:
  axios('/extend/get', {method: 'get', params: {msg: 'hello'}})
  axios({url: '/extend/get', method: 'get', params: {msg: 'hello'}})
}



/**
 * 功能3 测试
 * Axios接受一个泛型，这个泛型是返回值的类型
 * * function getXXX<T>
 *   return axios.get<ResponseData<T>>('/somepath')
 * 通过
 */
function ExtendTest3() {
  interface ResponseData<T = any> {
    code: number
    result: T
    message: string
  }

  interface User {
    name: string
    age: number
  }

  function getUser<T>() {
    return axios<ResponseData<T>>('/extend/user', {method: 'get'})
      .then(res => res.data)
      .catch(err => console.error(err))
  }

  async function test() {
    const user = await getUser<User>()
    if (user) {
      console.log(user.result.name)
    }
  }

  test()
}
ExtendTest1()
// ExtendTest2()
// ExtendTest3()








