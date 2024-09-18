import CancelToken from '../../src/cancel/CancelToken'
import axios from '../../src/index'

/**
 * Axios请求取消方法
 * 通过创建CancelToken类，储存一个pendding状态的promise
 * 然后把这个promise的resolve方法暴露出来当作这个promise的触发器
 * 在我们需要取消请求的地方，放入<pendding>promise.then(xxx)
 * 当我们触发resolve方法的时候，promise就会立即执行xxx代码
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
            cancelToken: new CancelToken(
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
            cancelTeiger('Cancel by Ins myself')
        },
        200
    )    
}

function test2() {
    let source = CancelToken.source()
    let cancel = source.cancel
    
    axios.get('/cancel/get', {
        cancelToken: source.token
    }).catch(e => {
        console.log(e)
    })
    setTimeout(
        () => {
            cancel('Cancel by sourceFn myself')
        },
        200
    )
}
test1()
test2()
