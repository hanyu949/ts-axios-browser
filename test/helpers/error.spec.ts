import { AxiosError, createAxiosError } from '../../src/helpers/error'
import { AxiosResponse } from '../../src/types'

describe('helpers:error', () => {
  test('should create an Error with message, config, code, request response and isAxiosError', () => {
    const response: AxiosResponse = {
      data: { foo: 'bar' },
      status: 200,
      statusText: 'OK',
      headers: null,
      config: { method: 'post' },
      request: new XMLHttpRequest()
    }
    const error: AxiosError = createAxiosError(
      'jest test errorMsg',
      { url: '/error' },
      'E-001',
      new XMLHttpRequest(),
      response
    )
    expect(error instanceof Error).toBeTruthy()
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('jest test errorMsg')
    expect(error.config).toEqual({ url: '/error' })
    expect(error.code).toBe('E-001')
    expect(error.request instanceof XMLHttpRequest).toBeTruthy()
    expect(error.response).toEqual(response)
    expect(error.isAxiosError).toBeTruthy()
  })
})
