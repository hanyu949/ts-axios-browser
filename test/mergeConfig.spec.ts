import axios from '../src/index'
import { mergeConfig } from '../src/core/mergeConfig'

describe('mergeConfig', () => {
    const defaults = axios.defaults

    test('should accept undefined for second argument', () => {
        expect(mergeConfig(defaults, undefined)).toEqual(defaults)
    })

    test('should accept an object for second argument', () => {
        expect(mergeConfig(defaults, {})).toEqual(defaults)
    })

    test('should not leave references', () => {
        const merged = mergeConfig(defaults, {})
        expect(merged).toEqual(defaults)
        expect(merged.headers).toBe(defaults.headers)
    })

    test('should allow setting request options', () => {
        const config = {
            url: '__sample url__',
            params: { test: '__sample params__' },
            data: { foo: true }
        }
        const merged = mergeConfig(defaults, config)
        expect(merged.url).toBe(config.url)
        expect(merged.params).toBe(config.params)
        expect(merged.data).toEqual(config.data)
    })

    test('should allow setting other options', () => {
        const merged = mergeConfig(defaults, {
            timeout: 123
        })
        expect(merged.timeout).toBe(123)
    })
})