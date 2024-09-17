import qs from 'qs'
import axios, { TransformFn } from '../../src/index'

/**
 * 在发送每个请求，用户传递的配置可以和默认配置做一层合并。
 * 下面是当前默认的配置
 * {
 *   "method": "get",
 *   "timeout": 0,
 *   "headers": {
 *     "common": {
 *       "Accept": "application/json, text/plain, *\/*",
 *       "test": 'default.test value'
 *     },
 *     "delete": {},
 *     "get": {},
 *     "head": {},
 *     "options": {},
 *     "post": {
 *       "Content-Type": "application/x-www-form-urlencoded"
 *     },
 *     "put": {
 *       "Content-Type": "application/x-www-form-urlencoded"
 *     },
 *     "patch": {
 *       "Content-Type": "application/x-www-form-urlencoded"
 *     }
 *   }
 * } 
 */

/**
 * 用户传递的配置可以和默认配置做一层合并。
 * 测试1 覆盖默认headers中的test，并且Accept正常显示
 * 测试2 覆盖post的Content-Type: application/x-www-form-urlencoded  => application/json;charset=utf-8
 * 测试3 默认配置Content-Type: application/x-www-form-urlencoded是否生效
 * 通过
 */
function test1() {
  axios('/config/get', {params: {a: 1}, headers: {test: "recover header.test"}})
    .then(res => {
      console.log('测试1 覆盖默认headers中的test, 并且Accept正常显示 预期headers包含{test: "recover header.test", "Accept": "application/json, text/plain, */*",}', res.config.headers)
    })
  axios('/config/post', {data: {a: 1}, method: 'post', headers: {'Content-Type': 'application/json;charset=utf-8'}})
    .then(res => {
      console.log(`测试2 覆盖post的Content-Type: application/x-www-form-urlencoded  => application/json;charset=utf-8 预期headers包含{Content-Type: application/json;charset=utf-8}`, res.config.headers)
    })
  axios({
    url: '/config/post',
    method: 'post',
    data: qs.stringify({
      a: 1
    }),
    headers: {
      test: '321'
    }
  }).then((res) => {
    console.log(`测试3 默认配置Content-Type: application/x-www-form-urlencoded 是否生效 如果生效后面返回{a: '1'}`, res.data)
  })
}
// test1()

/**
 * 功能2 请求和响应配置化
 * 
 * Axios的Config中增加 transformRequest transformResponse 它们的值是一个数组或者是一个函数。
 * request 只适用于 put post patch，这个链要返回一个字符串或 FormData、URLSearchParams、Blob 等类型作为   xhr.send 方法的参数
 */
function test2 () {
  axios({
    transformRequest: [(function(data) {
      return qs.stringify(data)
    })],
    transformResponse: [function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }],
    url: '/config/post',
    method: 'post',
    data: {
      a: 1
    }
  }).then((res) => {
    // 测试点1 config.data = a=1   res.data = {..., a: 1}
    console.log("功能2 请求和响应配置化 预期config: config.data = a=1   结果：", res.config.data)
    console.log("功能2 请求和响应配置化 预期config: res.data = {..., a: 1}   结果：", res.data)
  })
}
// /test2() 

/**
 * 功能3 扩展 axios.create 静态接口
 * 创建一个新的Axios实例，允许我们传入新的配置和默认配置合并，并做为新的默认配置。
 */
async function test3() {
  // 新的配置和默认配置合并，并做为新的默认配置。
  const instance = axios.create({
    transformRequest: [(function(data) {
      return qs.stringify(data)
    })],
    transformResponse: [function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }]
  })
  
  let newIns = await instance({
    url: '/config/post',
    method: 'post',
    data: {
      a: 1
    }
  })
  let oldDog = await axios({
    url: '/config/post',
    method: 'post',
    data: qs.stringify({
      a: 1
    })
  })
  console.log("老的axios默认配置不改变返回 预期应该是{a:1}  结果：", oldDog.data)
  console.log("新的axios默认配置改变返回数据 预期应该是{a:1, b:2}  结果：", newIns.data)
}
test3()