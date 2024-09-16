import qs from 'qs'
import axios from '../../src/index'

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
 * 测试1 覆盖默认headers中的test，并且Accept正常显示
 * 测试2 覆盖post的Content-Type: application/x-www-form-urlencoded  => application/json;charset=utf-8
 * 测试3 默认配置Content-Type: application/x-www-form-urlencoded是否生效
 * 通过
 */
function test() {
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
    console.log(`测试3 默认配置Content-Type: application/x-www-form-urlencoded 是否生效`, res.data)
  })
}
test()