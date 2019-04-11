import { isEmpty } from '@ember/utils'

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
  const rejectEmpty = part => !isEmpty(part)

  return flattenParts
    .filter(rejectEmpty)
    .map(stripSlashAtStartOrEnd)
    .join('/')
}

/**
 * Calculates full url for given path
 *
 * @param  {String} path        The path, like 'foo/bar/'
 * @param  {String} backendName The name of the backend you are building a url to
 * @param  {Object} backends    An object containing backend information, like:
 *                                 const backends = {
 *                                   testBackend: {
 *                                     host: 'http://example.com',
 *                                     namespace: 'api'
 *                                   }
 *                                 }
 * @return {String}             The URL, including host and namespace to API.
 */
export function urlFor(path, backendName = 'echo', backends = {}) {
  const backend = backends[backendName]
  return pathFor(backend.host, backend.namespace, path.split('/'))
}




/**
 * Makes a query string out of given object
 *
 * @param  {Object}     obj   The object to build query string of.
 * @return {String}           A string encoded as a query string.
 */
export function toQueryString(obj) {
  const parts = []

  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      parts.push(`${encodeURIComponent(i)}=${encodeURIComponent(obj[i])}`)
    }
  }

  return parts.join('&')
}
