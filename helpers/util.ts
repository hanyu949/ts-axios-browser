const toString = Object.prototype.toString

export const isDate = (val: any): val is Date => {
    return toString.call(val) === '[Object Date]'
}

export const isObject = (val: any): val is Object => {
    return val !== null && typeof val === 'object'
}
