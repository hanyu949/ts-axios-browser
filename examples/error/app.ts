import axios, { AxiosError } from "../../src";

/**
 * 错误处理
 * 1. 处理网络异常错误 reject(new Error('Network Error')) Errormsg: Network Error
 * 2. 处理超时错误 reject(new Error(`Timeout of ${timeout} ms exceeded`)) Errormsg: Timeout of ${timeout} ms exceeded
 * 3. 处理非 200 状态码 reject(new Error(`Request failed with status code ${response.status}`)) Errormsg: Request failed with status code ${response.status}
 */
function test1() {
    // 2. 处理超时错误
    axios({
        method: 'get',
        url: '/error/timeout',
        timeout: 2000
    })
    .then(res => {console.log("成功请求", res.data)})
    .catch((e: AxiosError) => {
        console.log("功能2测试 2. 处理超时错误 预期返回: Timeout of 2000 ms exceeded,  实际返回：", e.message)
    })
    // 3. 处理非 200 状态码
    axios({
        method: 'get',
        url: '/error/get'
    })
    .then(res => {console.log(res)})
    .catch(e => {
        console.log("功能3测试 3. 处理非 200 状态码 预期返回: Request failed with status code 500,  实际返回：", e.message)
    })
}
test1()