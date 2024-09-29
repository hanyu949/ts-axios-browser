import axios, { AxiosResponse, AxiosError } from '../src/index'
import { getAjaxRequest } from './helper'

describe('headers', () => {
    beforeEach(() => {
        jasmine.Ajax.install()
    })
    afterEach(() => {
        jasmine.Ajax.uninstall()
    })
    test('should use default common headers', () => {
        const axiosIns = axios.create({ headers: { common: { foo: 'bar' }}})
        axiosIns('/foo')
        return getAjaxRequest().then(res => {
            expect(res.requestHeaders?.foo).toBe('bar')
        })
    })
    test('should add extra header for post (application/x-www-form-urlencoded)', () => {
        axios.post('/foo', new URLSearchParams('a=b'))
        return getAjaxRequest().then(request => {
            expect(request.requestHeaders['Content-Type']).toBe('application/x-www-form-urlencoded')
        })
    })
    test('should use application/json when posting an object', () => {
        axios.post('/foo', { headerTest: 'bar' })
        return getAjaxRequest().then(request => {
            expect(request.requestHeaders['Content-Type']).toBe('application/json;charset=utf-8')
        })
    })
    test('should remove content-type if data is empty', () => {
        axios.post('/foo')
        return getAjaxRequest().then(request => {
            expect(request.requestHeaders['Content-Type']).toBeUndefined()
        })
    })
    test('should preserve content-type if data is false', () => {
        axios.post('/foo', false)
        return getAjaxRequest().then(request => {
            expect(request.requestHeaders['Content-Type']).toBe('application/x-www-form-urlencoded')
        })
    })
    test('should remove content-type if data is formData', () => {
        axios.post('/foo', new FormData().append('foo', 'bar'))
        return getAjaxRequest().then(request => {
            expect(request.requestHeaders['Content-Type']).toBeUndefined()
        })
    })
})