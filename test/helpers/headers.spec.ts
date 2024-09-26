import { buildHeaders, flattenHeaders, parseHeaders } from '../../src/helpers/headers'

describe('helpers:headers', () => {
  describe('parseHeaders', () => {
    test('should parse headers', () => {
      const responseHeaders = `
        connection: keep-alive\r\n
        content-length: 13\r\n
        content-type: application/json; charset=utf-8\r\n
        date: Mon, 09 Sep 2024 06:14:30 GMT\r\n
        etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"\r\n
        keep-alive: timeout=5\r\n
        x-powered-by: Express
      `
      const parsed = parseHeaders(responseHeaders)
      expect(parsed['connection']).toBe('keep-alive')
      expect(parsed['content-length']).toBe('13')
      expect(parsed['content-type']).toBe('application/json; charset=utf-8')
      expect(parsed['date']).toBe('Mon, 09 Sep 2024 06:14:30 GMT')
      expect(parsed['etag']).toBe('W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"')
      expect(parsed['keep-alive']).toBe('timeout=5')
      expect(parsed['x-powered-by']).toBe('Express')
    })
    test('should return empty object if headers is empty string', () => {
      const responseHeaders = ``
      expect(parseHeaders(responseHeaders)).toEqual({})
    })
  })
  describe('buildHeaders', () => {
    test('should normalize Content-Type header name', () => {
      const config = {
        headers: {
          'CONTENT-TYPE': 'application/json',
          'Content-length': '1024'
        }
      }
      const buildedHeaders = buildHeaders(config)
      expect(buildedHeaders['Content-Type']).toBe('application/json')
      expect(buildedHeaders['conTenT-Type']).toBeUndefined()
      expect(buildedHeaders['Content-length']).toBe('1024')
    })
    test('should set Content-Type if not set and data is PlainObject', () => {
      const config = {
        data: { foo: 'bar' },
        headers: {}
      }
      const bh = buildHeaders(config)
      expect(bh['Content-Type']).toBe('application/json;charset=utf-8')
    })
    test('should set not Content-Type if not set and data is not PlainObject', () => {
      const config = {
        headers: {},
        data: new URLSearchParams('a=b')
      }
      const bh = buildHeaders(config)
      expect(bh['Content-Type']).toBeUndefined()
    })
    test('should return empty object if headers is undefined or null', () => {
      let config = {}
      expect(buildHeaders(config)).toEqual({})
    })
  })
  describe('flattenHeaders', () => {
    test('should flatten the headers and includ common headers', () => {
      const headers = {
        Accept: 'application/json',
        common: {
          'X-COMMON-HEADER': 'commonHeaderValue'
        },
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        },
        post: {
          'X-POST-HEADER': 'postHeaderValue'
        }
      }

      expect(flattenHeaders(headers, 'get')).toEqual({
        Accept: 'application/json',
        'X-COMMON-HEADER': 'commonHeaderValue',
        'X-GET-HEADER': 'getHeaderValue'
      })
    })
    test('should flatten the headers without common headers', () => {
      const headers = {
        Accept: 'application/json',
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        }
      }

      expect(flattenHeaders(headers, 'patch')).toEqual({
        Accept: 'application/json'
      })
    })
    test('should do nothing if headers is undefined or empty object', () => {
      expect(flattenHeaders(undefined, 'get')).toBeUndefined()
      expect(flattenHeaders({}, 'post')).toEqual({})
    })
  })
})
