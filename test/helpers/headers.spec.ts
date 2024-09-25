describe('helpers:headers', () => {
  describe('parseHeaders', () => {
    test('should parse headers', () => {})
    test('should return empty object if headers is empty string', () => {})
  })
  describe('processHeaders', () => {
    test('should normalize Content-Type header name', () => {})
    test('should set Content-Type if not set and data is PlainObject', () => {})
    test('should set not Content-Type if not set and data is not PlainObject', () => {})
    test('should do nothing if headers is undefined or null', () => {})
  })
  describe('flattenHeaders', () => {
    test('should flatten the headers and includ common headers', () => {})
    test('should flatten the headers without common headers', () => {})
    test('should do nothing if headers is undefined or null', () => {})
  })
})
