import QueryString from "qs"
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
  const config = (method?, params?): AxiosRequestConfig => {
    return {
      method,
      params,
    }
  }
  Promise.all([
    axios.request({url: '/extend/get', ...config('get', {params: '测试extend get方法'})}),
    axios.get('/extend/get', config('get', {params: '测试extend get方法'})),
    axios.delete('/extend/delete', config('delete', {params: '测试extend delete方法'})),
    axios.head('/extend/head', config('head', {params: '测试extend head方法'})),
    axios.options('/extend/options', config('options', {params: '测试extend options方法'})),
    axios.post('/extend/post',  QueryString.stringify({data: '测试extend post方法'})),
    axios.put('/extend/put', QueryString.stringify({data: '测试extend put方法'})),
    axios.patch('/extend/patch', QueryString.stringify({data: '测试extend patch方法'}))
  ]).then(ress => {
    ress.forEach(res => {
      console.log(res.data)
    })
    console.log('成功返回')
  }).catch(e => {
    console.error('Error', e)
  })
  
}


/**
 * 功能2 测试
 * 下面 post get 各三个返回结果应该是一样的
 * 
 * 通过
 */
function ExtendTest2() {
  // post:
  Promise.all(
    [
      axios('/extend/post', {method: 'post', data: QueryString.stringify({msg: 'hello post'})}),
      axios({url: '/extend/post', method: 'post', data: QueryString.stringify({msg: 'hello post'})}),
      axios.post('/extend/post', QueryString.stringify({msg: 'hello post'}))
    ]
  ).then(res => {
    res.forEach(r => {
      console.log(r.data)
    })
  })


  // get:
  Promise.all(
    [
      axios('/extend/get', {method: 'get', params: {msg: 'hello get'}}),
      axios({url: '/extend/get', method: 'get', params: {msg: 'hello get'}}),
      axios.get('/extend/get', {params: {msg: 'hello get'}})
    ]
  ).then(res => {
    res.forEach(r => {
      console.log(r.data)
    })
  })

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
// ExtendTest1()
// ExtendTest2()
// ExtendTest3()








