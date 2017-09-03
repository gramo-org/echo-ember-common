import Ember from 'ember'

/**
 * Returns path for parts
 *
 * @param  {String} ...parts    Any number of strings
 * @return {String}             The parts joined together with '/',
 *                              excluding empty parts.
 */
export function pathFor(...parts) {
  const flattenParts = parts.reduce((array, part) => array.concat(part), [])
  const stripSlashAtStartOrEnd = part => part.replace(/(^\/|\/$|)/g, '')
  const rejectEmpty = part => !Ember.isEmpty(part)

  return flattenParts
    .filter(rejectEmpty)
    .map(stripSlashAtStartOrEnd)
    .join('/')
}

/**
 * Calculates full url for given path
 *
 * @param  {String} path  The path, like 'foo/bar/'
 * @return {String}       The URL, including host and namespace to API.
 */
export function urlFor(path, backendName = 'echo', backends = {}) {
  const backend = backends[backendName]
  return pathFor(backend.host, backend.namespace, path.split('/'))
}





export function toQueryString(obj) {
  const parts = []

  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      parts.push(`${encodeURIComponent(i)}=${encodeURIComponent(obj[i])}`)
    }
  }

  return parts.join('&')
}
