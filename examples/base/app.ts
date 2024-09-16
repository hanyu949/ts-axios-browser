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

/**
 * 功能1测试  如果Method是get的情况：
 *  a. 参数值为数组
 *  b. 参数为对象
 *  c. 参数Date类型
 *  d. 特殊字符的支持
 *  e. 空值忽略 {a: null} a忽略
 *  f. 丢弃url中哈希的标记
 *  g. 保留url中已经存在的参数
 * 通过
 */
function test1() {
    axios({
        method: 'get',
        url: '/base/get',
        params: {
            foo: ['bar', 'baz']
        }
    }).then(res => {
        console.log("功能1测试 a. 参数值为数组 预期返回：['bar', 'baz'],  实际返回：", res.data)
    })

    axios({
        method: 'get',
        url: '/base/get',
        params: {
            foo: {
                bar: 'baz'
            }
        }
    }).then(res => {
        console.log("功能1测试 b. 参数为对象 预期返回：{ bar: 'baz' },  实际返回：", res.data)
    })

    const date = new Date()
    axios({
        method: 'get',
        url: '/base/get',
        params: {
            date
        }
    }).then(res => {
        console.log("功能1测试 c. 参数Date类型 预期返回: new Date(),  实际返回：", res.data)
    })

    axios({
        method: 'get',
        url: '/base/get',
        params: {
            foo: '@:$, '
        }
    }).then(res => {
        console.log("功能1测试 d. 特殊字符的支持 预期返回: {foo: '@:$, '},  实际返回：", res.data)
    })

    axios({
    method: 'get',
    url: '/base/get',
        params: {
            foo: 'bar',
            baz: null,
            bar: 2
        }
    }).then(res => {
        console.log("功能1测试 e. 空值忽略 预期返回: {foo: 'bar', bar: 2},  实际返回：", res.data)
    })

    axios({
        method: 'get',
        url: '/base/get#hash',
        params: {
            foo: 'bar'
        }
    }).then(res => {
        console.log("功能1测试 f. 丢弃url中哈希的标记 预期请求URL: '/base/get?foo=bar',  实际返回：", res.config.url)
    })

    axios({
        method: 'get',
        url: '/base/get?foo=bar',
        params: {
            bar: 'baz'
        }
    }).then(res => {
        console.log("功能1测试 g. 保留url中已经存在的参数 预期请求URL: '/base/get?foo=bar&bar=baz',  实际返回：", res.config.url)
    })
}
// test1()

/**
 * 功能2&3测试 处理body 处理请求headers
 *  1. XMLHttpRequest.send发送请求
 *     data可以支持Document 和 BodyInit 类型
 *     BodyInit 包括了 Blob, BufferSource, FormData, URLSearchParams, ReadableStream、USVString
 *  2. 如果传入普通对象，则需要将对象转化为JSON字符串 (data.ts/buildData)
 * 
 *  3.1可以配置headers属性 headers: 'content-type': 'application/json;charset=utf-8'
 *  3.2当data字段是普通对象的时候，如果没有配置 'content-type': 'application/json;charset=utf-8'，
 * 通过
 */
function test2() {
    axios({
        method: 'post',
        url: '/base/post',
        data: {
            a: 1,
            b: 2
        }
    }).then(res => {
        console.log("功能2&3测试 2. 如果传入普通对象,则需要将对象转化为JSON字符串 预期返回：{a:1,b:2},  实际返回：", res.data)
        console.log("功能2&3测试 3.2. 当data字段是普通对象的时候, 如果没有配置 headers预期返回包含: 'content-type': 'application/json;charset=utf-8',  实际返回：", res.config.headers)
    })

    axios({
        method: 'post',
        url: '/base/post',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        },
        data: {
            a: 1,
            b: 2
        }
    }).then(res => {
        console.log("功能2&3测试 3.1. 可以配置headers属性 headers: 'content-type': 'application/json;charset=utf-8' headers预期返回包含: 'content-type': 'application/json;charset=utf-8',  实际返回：", res.config.headers)
    })
    
    const paramsString = 'q=URLUtils.searchParams&topic=api'
    const searchParams = new URLSearchParams(paramsString)

    axios({
        method: 'post',
        url: '/base/post',
        data: searchParams
    }).then(res => {
        console.log("功能2测试 1. XMLHttpRequest.send发送请求 预期返回: new URLSearchParams,  实际返回：", res.data)
    })


}
// test2()

/**
 * 测试
 * 4. 获取响应数据 通过
 *    响应的response可以通过Promise拿到，返回的数据包括：
 *      a. data
 *      b. status
 *      c. statusText
 *      d. headers
 *      e. config
 *      f. request（XML对象的实例）
 * 5. 处理响应headers 
 *    相应的headers是字符串，把他转化成对象
 * 6. 处理响应data
 *    在不去设置 responseType 的情况下，当服务端返回给我们的数据是字符串类型，我们可以尝试去把它转换成一个 JSON 对象。
 */
function test3() {
    axios({
        method: 'post',
        url: '/base/post',
        data: {
            a: 1,
            b: 2
        }
    }).then(res => {
        console.log("功能4测试 组织响应数据 预期返回：[data, status, statusText, headers, config, request],  实际返回：", Object.keys(res))
        console.log("功能5测试 相应的headers是字符串, 把他转化成对象 预期返回：[object Object],  实际返回：", Object.prototype.toString.call(res.headers))
        console.log("功能6测试 在不去设置 responseType 的情况下，当服务端返回给我们的数据是字符串类型，我们可以尝试去把它转换成一个 JSON 对象 预期返回: [object Object],  实际返回：", Object.prototype.toString.call(res.data))
    })
}

test1()
test2()
test3()
