import { isArray } from './array'
import { isObject, isPlainObject } from './object'

// === DataType check utils ===

// Shoutout AngusCroll (https://goo.gl/pxwQGp)
export const toType = (obj) => ({}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase())

export const isUndefined = val => val === undefined

export const isNull = val => val === null

export const isEmptyString = val => val === ''

export const isUndefinedOrNull = val => isUndefined(val) || isNull(val)

export const isUndefinedOrNullOrEmpty = val => isUndefinedOrNull(val) || isEmptyString(val)

export const isFunction = val => toType(val) === 'function'

export const isBoolean = val => toType(val) === 'boolean'

export const isString = val => toType(val) === 'string'

export const isNumber = val => toType(val) === 'number'

export const isPrimitive = val => isBoolean(val) || isString(val) || isNumber(val)

export const isDate = val => val instanceof Date

export const isEvent = val => val instanceof Event

export const isRegExp = val => toRawType(val) === 'RegExp'

export const isPromise = val =>
  !isUndefinedOrNull(val) && isFunction(val.then) && isFunction(val.catch)

// === Re-exports imported usefull dataType utils ===

export { isArray, isObject, isPlainObject }
