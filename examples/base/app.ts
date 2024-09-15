import axios from '../../src/index';


/**
 * Axios基础功能的实现
 * 测试
 * 1. 处理请求的url
 *    如果Method是get的情况：
 *      a. 参数值为数组
 *      b. 参数为对象
 *      c. 参数Date类型
 *      d. 特殊字符的支持
 *      e. 空值忽略 {a: null} a忽略
 *      f. 丢弃url中哈希的标记
 *      g. 保留url中已经存在的参数
 * 2. 处理body
 *    1. XMLHttpRequest.send发送请求 data可以支持Document 和 BodyInit 类型，BodyInit 包括了 Blob, BufferSource, FormData, URLSearchParams, ReadableStream、USVString
 *    2. 如果传入普通对象，则需要将对象转化为JSON字符串 (data.ts/buildData)
 * 3. 处理请求headers
 *    1. 可以配置headers属性 headers: 'content-type': 'application/json;charset=utf-8'
 *    2. 当data字段是普通对象的时候，如果没有配置'content-type': 'application/json;charset=utf-8'，自动设置请求的header的Content-Type字段。
 * 4. 获取响应数据
 *    响应的response可以通过Promise拿到，返回的数据包括：
 *       a. data
 *       b. status
 *       c. statusText
 *       d. headers
 *       e. config
 *       f. request（XML对象的实例）
 * 5. 处理响应headers
 *    相应的headers是字符串，把他转化成对象
 * 6. 处理响应data
 *    在不去设置 responseType 的情况下，当服务端返回给我们的数据是字符串类型，我们可以尝试去把它转换成一个 JSON 对象。
 */
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null,
    bar: 2
  }
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 1,
    b: 2
  }
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;'
  },
  data: {
    a: 1,
    b: 2
  }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})

axios({
  method: 'post',
  url: '/base/post',
  data: {a:123}
}).then((res) => {
  console.log(res, 1)
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then((res) => {
  console.log(res, 2 )
})