export interface AxiosInstance {
  request: AxiosRequestFunctionType
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  create(config?: AxiosRequestConfig): AxiosInstance
  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
export interface AxiosRequestFunctionType {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: Record<string, any>
  headers?: Record<string, string>
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: TransformFn | TransformFn[]
  transformResponse?: TransformFn | TransformFn[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string

  [propName: string]: any
}
export interface TransformFn {
  (data: any, headers?: any): any
}
export interface AxiosDefaultConfig {
  url?: string
  method?: Method
  headers?: DefaultHeaders
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: TransformFn | TransformFn[]
  transformResponse?: TransformFn | TransformFn[]
  [propName: string]: any
}
interface DefaultHeaders {
  common?: Record<string, string>
  get?: Record<string, string>
  GET?: Record<string, string>
  delete?: Record<string, string>
  Delete?: Record<string, string>
  head?: Record<string, string>
  HEAD?: Record<string, string>
  options?: Record<string, string>
  OPTIONS?: Record<string, string>
  post?: Record<string, string>
  POST?: Record<string, string>
  put?: Record<string, string>
  PUT?: Record<string, string>
  patch?: Record<string, string>
  PATCH?: Record<string, string>
  [propName: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}
