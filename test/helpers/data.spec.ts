import { buildData, transformResponse } from '../../src/helpers/data'

describe('helper:data', () => {
  describe('buildData', () => {
    test('should transform request data to string if data is a PlainObject', () => {
      const config = {
        data: { a: 1 }
      }
      buildData(config)
      expect(config.data).toBe('{"a":1}')
    })
    test('should do nothing if data is not a PlainObject', () => {
      const config = {
        data: new URLSearchParams('a=b')
      }
      buildData(config)
      expect(config.data).toEqual(new URLSearchParams('a=b'))
    })
    test('should return undefined if data is null', () => {
      const config = {
        data: null
      }
      expect(buildData(config)).toEqual(undefined)
    })
    test('should return undefined if data is not exist', () => {
      const config = {}
      expect(buildData(config)).toEqual(undefined)
    })
  })
  describe('transformResponse', () => {
    test('should transform response data to Object if data is a JSON string', () => {
      const jsonString = '{"a": 2}'
      expect(transformResponse(jsonString)).toEqual({ a: 2 })
    })
    test('should do nothing if data is a string but not a JSON string', () => {
      const str = 'string'
      expect(transformResponse(str)).toBe(str)
    })
    test('should do nothing if data is not a string', () => {
      const obj = { a: 2 }
      expect(transformResponse(obj)).toBe(obj)
    })
  })
})
