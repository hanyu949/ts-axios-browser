import axios from '../../src/index'

/**
 * Axios请求取消方法
 * 通过创建CancelToken类，储存一个pendding状态的promise
 * 然后把这个promise的resolve方法暴露出来当作这个promise的触发器
 * 在我们需要取消请求的地方，放入<pendding>promise.then(xxx)
 * 当我们触发resolve方法的时候，promise就会立即执行xxx代码
 */

/**
 * 测试1
 * 通过在config中声明cancelToken实例的方法，取消请求
 */
function test1() {
    let cancelTeiger
    axios(
        {
            method: 'get',
            url: '/cancel/get',
            params: {
                a: 1
            },
            cancelToken: new axios.CancelToken(
                (teiger) => {
                    cancelTeiger = teiger
                }
            )
        }
    ).catch(e => {
        console.log(e)
    })
    setTimeout(
        () => {
            cancelTeiger('测试1 Cancel by Ins myself')
        },
        200
    )    
}

/**
 * 测试2
 * 通过CancelToken类中的source方法，取消请求
 */
function test2() {
    let source = axios.CancelToken.source()
    let cancel = source.cancel
    
    axios.get('/cancel/get', {
        cancelToken: source.token
    }).catch(e => {
        console.log(e)
    })
    setTimeout(
        () => {
            cancel('测试2 Cancel by sourceFn myself')

            // 这个请求不会再发出，而是直接返回上面的cancelMsg
            axios.get('/cancel/get', {
                cancelToken: source.token
            }).catch(e => {
                console.log(e)
            })
        },
        200
    )
}
test1()
test2()
