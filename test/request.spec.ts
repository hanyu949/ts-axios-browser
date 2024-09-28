import { getAjaxRequest } from './helper'
import axios, { AxiosResponse, AxiosError } from '../src/index'

describe('requests', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })
  test('should treat single string arg as url', () => {
    axios('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })

  test('should treat method value as lowercase string', done => {
    axios({
      url: '/foo',
      method: 'POST'
    }).then(response => {
      expect(response.config.method).toBe('POST')
      done()
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200
      })
    })
  })

  test('should reject on network errors', done => {
    const resolveSpy = jest.fn((res: AxiosResponse) => res)

    const rejectSpy = jest.fn((e: AxiosError) => e)

    jasmine.Ajax.uninstall()

    axios('/foo')
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    function next(reason: AxiosResponse | AxiosError) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('Network Error')
      expect(reason.request).toEqual(expect.any(XMLHttpRequest))
      jasmine.Ajax.install()
      done()
    }
  })
  test('should reject when request timeout', done => {
    let err: AxiosError

    axios('/foo', {
      method: 'post',
      timeout: 2000
    }).catch(error => {
      err = error
    })

    getAjaxRequest().then(request => {
      // @ts-ignore
      request.eventBus.trigger('timeout')

      setTimeout(() => {
        expect(err instanceof Error).toBeTruthy()
        expect(err.message).toBe('Timeout of 2000 ms exceeded')
        done()
      }, 100)
    })
  })
  test('should reject when validateStatus returns false', done => {
    const resolveSpy = jest.fn((res: AxiosResponse) => res)
    const rejecteSpy = jest.fn((err: AxiosError) => err)

    axios('foo', {
      validateStatus: status => {
        return status !== 500
      }
    })
      .then(resolveSpy)
      .catch(rejecteSpy)
      .then(next)

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 500
      })
    })

    function next(reason: AxiosError | AxiosResponse) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejecteSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('Request failed with status code 500')
      expect((reason as AxiosError).response?.status).toBe(500)

      done()
    }
  })
})
