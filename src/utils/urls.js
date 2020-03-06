import { isArray, isNull, isPlainObject, isUndefined } from './inspect'
import { keys } from './object'
import { toString } from './string'

// Stringifies an object of query parameters
// See: https://github.com/vuejs/vue-router/blob/dev/src/util/query.js
export const stringifyQueryObj = obj => {
  if (!isPlainObject(obj)) {
    return ''
  }

  const query = keys(obj)
    .map(key => {
      const val = obj[key]
      if (isUndefined(val)) {
        return ''
      } else if (isNull(val)) {
        return encode(key)
      } else if (isArray(val)) {
        return val
          .reduce((results, val2) => {
            if (isNull(val2)) {
              results.push(encode(key))
            } else if (!isUndefined(val2)) {
              // Faster than string interpolation
              results.push(encode(key) + '=' + encode(val2))
            }
            return results
          }, [])
          .join('&')
      }
      // Faster than string interpolation
      return encode(key) + '=' + encode(val)
    })
    /* must check for length, as we only want to filter empty strings, not things that look falsey! */
    .filter(x => x.length > 0)
    .join('&')

  return query ? `?${query}` : ''
}

export const parseQuery = query => {
  const parsed = {}
  query = toString(query)
    .trim()
    .replace(queryStartRE, '')

  if (!query) {
    return parsed
  }

  query.split('&').forEach(param => {
    const parts = param.replace(plusRE, ' ').split('=')
    const key = decode(parts.shift())
    const val = parts.length > 0 ? decode(parts.join('=')) : null

    if (isUndefined(parsed[key])) {
      parsed[key] = val
    } else if (isArray(parsed[key])) {
      parsed[key].push(val)
    } else {
      parsed[key] = [parsed[key], val]
    }
  })

  return parsed
}
