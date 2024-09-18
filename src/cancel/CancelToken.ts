import { Canceler, CancelExecutor, CancelTokenSource } from '../types'

interface ResolvePromise {
  (reason?: string): void
}

/**
 * CancelToken:
 * 暴露了一个promise 想要执行的代码放在.then中
 * 在实例化这个class时，构造函数的参数也会暴露一个取消的函数，执行这个函数，会执行这个实例的promise.then中的函数
 * 用法：{
 * let 触发器
 * new CancelToken((c) => {触发器 = c})
 * 触发器() <= 执行这个代码就会把实例的promise解决，也就执行了.then()中的函数
 * }
 * reason： 是否执行过这个触发器
 */
export default class CancelToken {
  promise: Promise<string>
  reason?: string

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = message
      resolvePromise(this.reason)
    })
  }

  /**
   * 创建CancelToken实例，拿到触发器，然后返回实例和触发器
   * @returns {
   *   cancel 执行这个cancelFn就会把实例的promise解决
   *   token CancelToken的实例
   * }
   */
  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
