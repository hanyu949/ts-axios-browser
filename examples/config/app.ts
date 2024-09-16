import axios from '../../src/index'
import qs from 'qs'

/**
 * 在发送每个请求，用户传递的配置可以和默认配置做一层合并。
 * axios.defaults.headers.common['test'] = 123
 * axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
 * axios.defaults.timeout = 2000
 */

// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })
