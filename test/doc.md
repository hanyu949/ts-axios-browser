## 梳理整个测试要点
helpers/data 模块测试
	transformRequest:
		should transform request data to string if data is a PlainObject
		should do nothing if data is not a PlainObject
	transformResponse:
		should transform response data to Object if data is a JSON string
		should do nothing if data is a string but not a JSON string
		should do nothing if data is not a string
```
// transformRequest:
    // 应该在数据是 PlainObject（纯对象）时将其转换为字符串
    // 如果数据不是 PlainObject（纯对象），则不应做任何操作
// transformResponse:
    // 应该在响应数据是 JSON 字符串时将其转换为对象
    // 如果数据是字符串但不是 JSON 字符串，则不应做任何操作
    // 如果数据不是字符串，则不应做任何操作
```

helpers/error 模块测试
	should create an Error with message, config, code, request, response and isAxiosError
```
// 应该创建一个包含 message、config、code、request、response 和 isAxiosError 的错误对象
```

helpers/headers 模块测试
	parseHeaders:
		should parse headers
		should return empty object if headers is empty string
	buildHeaders
		should normalize Content-Type header name
		should set Content-Type if not set and data is PlainObject
		should set not Content-Type if not set and data is not PlainObject
		should do nothing if headers is undefined or null
	flattenHeaders
		should flatten the headers and include common headers
		should flatten the headers without common headers
		should do nothing if headers is undefined or null
```
// parseHeaders:
    // 应该解析 headers（请求头）
    // 如果 headers 是空字符串，则应该返回一个空对象
// processHeaders:
    // 应该规范化 Content-Type 请求头的名称
    // 如果 Content-Type 没有设置并且数据是 PlainObject（纯对象），则应设置 Content-Type
    // 如果 Content-Type 没有设置并且数据不是 PlainObject（纯对象），则不应设置 Content-Type
    // 如果 headers 是 undefined 或 null，则不应做任何操作
// flattenHeaders:
    // 应该扁平化 headers 并包含通用 headers
    // 应该扁平化 headers 并且不包含通用 headers
    // 如果 headers 是 undefined 或 null，则不应做任何操作
```

helpers/url 模块测试
	buildURL:
		should support null params
		should support params
		should ignore if some param value is null
		should ignore if the only param value is null
		should support object params
		should support date params
		should support array params
		should support special char params
		should support existing params
		should correct discard url hash mark
		should use serializer if provided
		should support URLSearchParams
	isAbsoluteURL
		should return true if URL begins with valid scheme name
		should return false if URL begins with invalid scheme name
		should return true if URL is protocol-relative
		should return false if URL is relative
	combineURL
		should combine URL
		should remove duplicate slashes
		should insert missing slash
		should not insert slash when relative url missing/empty
		should allow a single slash for relative url
	isURLSameOrigin
		should detect same origin
		should detect different origin
```
// buildURL:
    // 应该支持 null 的参数
    // 应该支持普通参数
    // 如果某个参数值是 null，则应忽略
    // 如果唯一的参数值是 null，则应忽略
    // 应该支持对象类型的参数
    // 应该支持日期类型的参数
    // 应该支持数组类型的参数
    // 应该支持特殊字符的参数
    // 应该支持已经存在的参数
    // 应该正确丢弃 URL 中的哈希标记（#号）
    // 如果提供了序列化器，应该使用序列化器
    // 应该支持 URLSearchParams
// isAbsoluteURL:
    // 如果 URL 以有效的方案名开头，则应返回 true
    // 如果 URL 以无效的方案名开头，则应返回 false
    // 如果 URL 是协议相对的，则应返回 true
    // 如果 URL 是相对路径的，则应返回 false
// combineURL:
    // 应该合并 URL
    // 应该移除重复的斜杠
    // 应该插入缺失的斜杠
    // 如果相对 URL 缺失或为空时，不应插入斜杠
    // 应该允许相对 URL 中的单个斜杠
// isURLSameOrigin:
    // 应该检测到相同的源（同源策略）
    // 应该检测到不同的源（跨域）
```

请求模块测试
在Jest中没有Ajax相关的插件，所以用到Jasmine。
requests:
	should treat single string arg as url
	should treat method value as lowercase string
	should reject on network error
	should reject when request timeout
	should reject when validateStatus returns false
	should resolve when validateStatus returns true
	should return JSON when resolved
	should return JSON when rejecting
	should supply correct response
	should allow overriding Content-Type header case-insensitive
	should support array buffer response
```
// requests:
    // 如果只有一个字符串参数，则应该将其视为 URL
    // 应该将 method（请求方法）值视为小写字符串
    // 如果发生网络错误，应该拒绝请求
    // 如果请求超时，应该拒绝请求
    // 如果 validateStatus 返回 false，则应拒绝请求
    // 如果 validateStatus 返回 true，则应解析请求
    // 当请求成功解析时，应该返回 JSON 数据
    // 当请求被拒绝时，应该返回 JSON 数据
    // 应该提供正确的响应数据
    // 应该允许覆盖大小写不敏感的 Content-Type 请求头
```

Headers模块单元测试
headers:
	should use default common headers
	should add extra header for post (application/x-www-form-urlencoded)
	should use application/json when posting an object
	should remove content-type if data is empty
	should preserve content-type if data is false
	should remove content-type if data is formData
```
// headers:
    // 应该使用默认的通用请求头
    // 应该为 post 请求添加额外的请求头（application/x-www-form-urlencoded）
    // 当发送对象时，应该使用 application/json
    // 如果数据为空，应该移除 Content-Type
    // 如果数据是 false，应该保留 Content-Type
    // 如果数据是 formData，应该移除 Content-Type

```

Axios 实例模块单元测试
instance
	should make a http request without verb helper
	should make a http request
	should make a post request
	should make a put request
	should make a patch reques
	should make a options reques
	should make a delete reques
	should make a head reques
	should use instance option
	should have defaults.headers
	should have interveptors on the instance
	should get the computed uri
```
// instance:
    // 应该在没有使用动词辅助函数时发起 HTTP 请求
    // 应该发起一个 HTTP 请求
    // 应该发起一个 post 请求
    // 应该发起一个 put 请求
    // 应该发起一个 patch 请求
    // 应该发起一个 options 请求
    // 应该发起一个 delete 请求
    // 应该发起一个 head 请求
    // 应该使用实例选项
    // 实例应该有 defaults.headers
    // 实例应该有拦截器
    // 应该获取计算后的 URI
```

拦截器模块单元测试
interceptors
	should add a request interceptor
	should add a request interceptor that returns a new config object
	should add a request interceptor that returns a promise
	should add multiple request interceptors
	should add a response interceptor
	should add a response interceptor that returns a new data object
	should add a response interceptor that returns a promise
	should add multiple response interceptors
	should allow removing interceptors
```
// interceptors:
    // 应该添加一个请求拦截器
    // 应该添加一个返回新配置对象的请求拦截器
    // 应该添加一个返回 Promise 的请求拦截器
    // 应该添加多个请求拦截器
    // 应该添加一个响应拦截器
    // 应该添加一个返回新数据对象的响应拦截器
    // 应该添加一个返回 Promise 的响应拦截器
    // 应该添加多个响应拦截器
    // 应该允许移除拦截器
```

mergeConfig  模块单元测试
mergeConfig
	should accept undefined for second argument
	should accept an object for second argument
	should not leave references
	should allow setting request options
	should not inherit request options
	should return default headers if pass config2 with undfined
	should merge auth, headers with defaults
	should overwrite auth, headers with a non-object value
	should allow setting other options
```
// mergeConfig:
    // 应该接受 undefined 作为第二个参数
    // 应该接受对象作为第二个参数
    // 不应保留引用
    // 应该允许设置请求选项
    // 不应继承请求选项
    // 如果 config2 为 undefined，应该返回默认的 headers
    // 应该合并 auth 和 headers 并保留默认值
    // 应该使用非对象值覆盖 auth 和 headers
    // 应该允许设置其他选项
```

请求取消模块单元测试
Cancel.spec.ts
	cancel: Cancel
		should returns correct result when message is specified
		should returns true if value is a Cancel
		should returns false if value is not a Cancel
CancelToken.spec.ts
	CancelToken
		reason:
			should returns a Cancel if cancellation has been requested
			should has no side effect if call cancellation for multi times
			should returns undefined if cancellation has not been requested
		promise:
			should returns a Promise that resolves when cancellation is requested
		throwIfRequested
			should throws if cancellation has been requested
			should does not throw if cancellation has not been requested
		source
			should returns an object containing token an cancel function
cancel.spec.ts
	cancel:
		when called before sending request
			should rejects Promise with a Cancel object
		when called after request has been sent
			should rejects Promise with a Cancel object
			calls abort on request object
		when called after response has been received
			should not cause unhandled rejection
```
// Cancel.spec.ts:
// cancel:
    // 如果指定了消息，应该返回正确的结果
    // 如果值是 Cancel，应该返回 true
    // 如果值不是 Cancel，应该返回 false

// CancelToken.spec.ts:
// CancelToken:
    // reason:
        // 如果已经请求取消，应该返回一个 Cancel 对象
        // 如果多次调用取消函数，不应该有副作用
        // 如果没有请求取消，应该返回 undefined
    // promise:
        // 应该返回一个在请求取消时解析的 Promise
    // throwIfRequested:
        // 如果已经请求取消，应该抛出异常
        // 如果没有请求取消，不应抛出异常
    // source:
        // 应该返回一个包含 token 和 cancel 函数的对象

// cancel.spec.ts:
// cancel:
    // 在发送请求前调用时:
        // 应该返回一个被 Cancel 对象拒绝的 Promise
    // 在请求已发送后调用时:
        // 应该返回一个被 Cancel 对象拒绝的 Promise
        // 应该调用 request 对象的 abort 方法
    // 在响应已收到后调用时:
        // 不应引发未处理的拒绝
```

defaults 模块单元测试
defaults
	should transform request json
	should do nothing to request string
	should transform response json
	should do nothing to response string
	should use global defaults config
	should use modified defaults config
	should use request config
	should use default config for custom instance
	should use GET headers
	should use POST headers
	should use header config
	should be used by customn instance if set before instance created
	should not be used by custom instance if set after instance created
```
// defaults:
    // 应该转换请求的 JSON 数据
    // 不应对请求字符串做任何处理
    // 应该转换响应的 JSON 数据
    // 不应对响应字符串做任何处理
    // 应该使用全局默认配置
    // 应该使用修改后的默认配置
    // 应该使用请求配置
    // 应该为自定义实例使用默认配置
    // 应该使用 GET 请求头
    // 应该使用 POST 请求头
    // 应该使用请求头配置
    // 如果在实例创建前设置，应该被自定义实例使用
    // 如果在实例创建后设置，不应被自定义实例使用
```

transform 模块用来定义请求和响应的转换方法
transform:
	should transform JSON to string
	should transform string to JSON
	should override default transform
	should allow an Array of transformers
	should allowing mutating headers
```
// transform:
    // 应该将 JSON 转换为字符串
    // 应该将字符串转换为 JSON
    // 应该允许覆盖默认转换
    // 应该允许使用转换器数组
    // 应该允许对请求头进行修改
```

XSRF 模块提供了一套防御 `xsrf` 攻击的解决方案
test/xsrf.spec.ts
xsrf
	should not set xsrf header if cookie is null
	should set xsrf header if cookie is set
	should not set xsrf header for cross origin
	should set xsrf header for cross origin when using withCredentials
```
// xsrf:
    // 如果 cookie 为空，应该不设置 xsrf 请求头
    // 如果 cookie 已设置，应该设置 xsrf 请求头
    // 对于跨域请求，应该不设置 xsrf 请求头
    // 使用 withCredentials 时，对于跨域请求，应该设置 xsrf 请求头
```

上传下载模块单元测试
test/progress.spec.ts
progress
	should add a download progress handler
	should add a upload progress handler(jasmine不会触发upload事件)
```
// progress:
    // 应该添加下载进度处理器
    // 应该添加上传进度处理器（jasmine 不会触发 upload 事件）
```

HTTP授权模块单元测试
test/auth.spec/ts
auth
	should accept HTTP Basic auth with username/password
	should fail to encode HTTP Basic auth credentials with non-Latin1 characters
```
// auth:
    // 应该接受带有用户名/密码的 HTTP Basic 认证
    // 对于非 Latin1 字符的 HTTP Basic 认证凭据，应该编码失败
```

忽略单元测试代码：/* istanbul ignore next */