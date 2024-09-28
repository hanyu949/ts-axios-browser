import { bulidURL, combineURL, isAbsoluteURL, isURLSameOrigin } from '../../src/helpers/url'
import { AxiosRequestConfig } from '../../src/types'

describe('helpers:url', () => {
  describe('buildURL', () => {
    test('should support null params', () => {
      let configs: AxiosRequestConfig = buildConfigs()
      delete configs['params']
      expect(bulidURL(configs)).toBeUndefined()
    })
    test('should support params', () => {
      let configs: AxiosRequestConfig = buildConfigs()
      configs.params = {
        bar: 'baz'
      }
      bulidURL(configs)
      const { url } = configs
      expect(url).toBe('/urlTest?bar=baz')
    })
    test('should ignore if some param value is null', () => {
      let configs: AxiosRequestConfig = buildConfigs()
      configs.params = {
        bar: null,
        foo: 'baz'
      }
      bulidURL(configs)
      const { url } = configs
      expect(url).toBe('/urlTest?foo=baz')
    })
    test('should ignore if the only param value is null', () => {
      let configs: AxiosRequestConfig = buildConfigs()
      configs.params = {
        bar: null
      }
      bulidURL(configs)
      const { url } = configs
      expect(url).toBe('/urlTest')
    })
    test('should support object params', () => {
      let configs: AxiosRequestConfig = buildConfigs()
      configs.params = {
        foo: {
          bar: 'baz'
        }
      }
      bulidURL(configs)
      const { url } = configs
      expect(url).toBe('/urlTest?foo=' + encodeURI('{"bar":"baz"}'))
    })
    test('should support date params', () => {
      let configs: AxiosRequestConfig = buildConfigs()
      configs.params = {
        date: new Date()
      }
      bulidURL(configs)
      const { url } = configs
      expect(url).toBe('/urlTest?date=' + configs.params.date.toISOString())
    })
    test('should support array params', () => {
      let configs: AxiosRequestConfig = buildConfigs()
      configs.params = {
        array: [1, 2]
      }
      bulidURL(configs)
      const { url } = configs
      expect(url).toBe('/urlTest?' + encodeURI('array[]=1&array[]=2'))
    })
    test('should support special char parmas', () => {
      let configs: AxiosRequestConfig = buildConfigs()
      configs.params = {
        sc: '@:$, '
      }
      bulidURL(configs)
      const { url } = configs
      expect(url).toBe('/urlTest?sc=@:$,%20')
    })
    test('should support existing params', () => {
      let configs: AxiosRequestConfig = buildConfigs()
      configs.url += '?foo=bar'
      configs.params = {
        bar: 'baz'
      }
      bulidURL(configs)
      const { url } = configs
      expect(url).toBe('/urlTest?foo=bar&bar=baz')
    })
    test('should sorrect discard url hash mark', () => {
      let configs: AxiosRequestConfig = buildConfigs()
      configs.url += '#foo'
      configs.params = {
        bar: 'baz'
      }
      bulidURL(configs)
      const { url } = configs
      expect(url).toBe('/urlTest?bar=baz')
    })
    // test('should use serializer if provided')
    test('should support URLSearchParams', () => {
      let configs: AxiosRequestConfig = buildConfigs()
      configs.url += '#foo'
      configs.params = new URLSearchParams('bar=baz')
      bulidURL(configs)
      const { url } = configs
      expect(url).toBe('/urlTest?bar=baz')
    })
  })
  describe('isAbsoluteURL', () => {
    test('should return true if URL begins with valid scheme name', () => {
      expect(isAbsoluteURL('https://api.github.com/users')).toBeTruthy()
      expect(isAbsoluteURL('custom-scheme-v1.0://example.com/')).toBeTruthy()
      expect(isAbsoluteURL('HTTP://example.com/')).toBeTruthy()
    })
    test('should return false if URL begins with invalid scheme name', () => {
      expect(isAbsoluteURL('123://example.com/')).toBeFalsy()
      expect(isAbsoluteURL('!valid://example.com/')).toBeFalsy()
    })
    test('should return true if URL is protocol-relative', () => {
      expect(isAbsoluteURL('//example.com/')).toBeTruthy()
    })

    test('should return false if URL is relative', () => {
      expect(isAbsoluteURL('/foo')).toBeFalsy()
      expect(isAbsoluteURL('foo')).toBeFalsy()
    })
  })
  describe('combineURL', () => {
    test('should combine URL', () => {
      expect(combineURL('https://api.github.com', '/users')).toBe('https://api.github.com/users')
    })
    test('should remove duplicate slashes', () => {
      expect(combineURL('https://api.github.com/', '/users')).toBe('https://api.github.com/users')
    })
    test('should insert missing slash', () => {
      expect(combineURL('https://api.github.com/', '/users')).toBe('https://api.github.com/users')
    })
    test('should not insert slash when relative url missing/empty', () => {
      expect(combineURL('https://api.github.com/users', '')).toBe('https://api.github.com/users')
    })
    test('should allow a single slash for relative url', () => {
      expect(combineURL('https://api.github.com/users', '/')).toBe('https://api.github.com/users/')
    })
  })
  describe('isURLSameOrigin', () => {
    test('should detect same origin', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
    })
    test('should detect different origin', () => {
      expect(isURLSameOrigin('https://github.com/axios/axios')).toBeFalsy()
    })
  })
})

function buildConfigs(): AxiosRequestConfig {
  return {
    url: '/urlTest',
    method: 'get',
    params: {},
    data: {
      bar: 'baz'
    }
  }
}
