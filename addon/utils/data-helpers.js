import Ember from 'ember'

/**
 * Helper function, taks care of transforming keys
 * and creating new objects for nested data.
 */
export function transform(value, classToBeCreatedForObjects = Ember.Object, keyTransformer = Ember.String.camelize, enforceUndefinedToNull = false) {
  switch (Ember.typeOf(value)) {
    case 'instance':
    case 'object': {
      const out = {}
      const object = value

      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          const dasherizedKey = keyTransformer(key)
          out[dasherizedKey] = transform(object[key], classToBeCreatedForObjects, keyTransformer)
        }
      }

      return classToBeCreatedForObjects ? classToBeCreatedForObjects.create(out) : out
    }
    case 'array':
      return value.map((value) => transform(value, classToBeCreatedForObjects, keyTransformer))
    default:
      return value === undefined && enforceUndefinedToNull ? null : value
  }
}



/**
 * Serialize and object and applies keyTransformer to all object keys
 *
 * If any of the object's values are undefined they will be returned as null
 *
 * @param  {Object}   object                                   The object to serialize
 * @param  {Function} [keyTransformer=Ember.String.dasherized] Key transformer function
 * @return {Object}                                            The serialized object
 */
export function serializeObject(object, keyTransformer = Ember.String.dasherized) {
  return transform(object, false, keyTransformer, true)
}


/**
 * Deserialize an object
 *
 * It deserializes and ensure keys are dasherized.
 *
 * @type    {Object}
 * @return  {Object}
 */
export const deserializeObject = transform

/**
 * Deserialize an array
 *
 * It deserializes and ensure if any objects is found in array that all of
 * the objects' keys are dasherized
 *
 * @type    {Array}
 * @return  {Array}
 */
export const deserializeArray = transform




/**
 * Deserialize JSON API array of data objects.
 *
 * @param  {Array}  data                The data to be deserialized
 * @param  {bool}   createEmberClass    Set to false to get plain old JS object.
 *                                      Ember object is returned by default to act as something you
 *                                      would expect from Ember Data.
 * @return {Array}                      The deserialized objects
 */
export function deserialize(data, createEmberClass = Ember.Object) {
  return data.map(raw => {
    const id = raw.id
    const attributes = Ember.merge({id}, deserializeObject(raw.attributes, createEmberClass))

    return createEmberClass ? createEmberClass.create(attributes) : attributes
  })
}

/**
 * returns a new object without keys which values
 * are rejected by the reject function recursively.
 *
 * ex:
 *  cleanObject({foo: 'bar', baz: null, bizz: undefined})
 *  => {foo: 'bar'}
 *
 * @param  {Object} val the object to copy and clean
 * @param  {Function} rejectFn a function to reject by, defaults to Ember.isBlank
 * @return {Object}     a new object wihtout blank values
 */
export function cleanObject(val, rejectFn = Ember.isBlank) {
  switch (Ember.typeOf(val)) {
    case 'instance':
    case 'object': {
      const cleanCopy = Object.assign({}, val)
      Object.keys(cleanCopy).forEach((key) => {
        cleanCopy[key] = cleanObject(cleanCopy[key])
        if (rejectFn(cleanCopy[key])) {
          delete cleanCopy[key]
        }
      })
      return rejectFn(Object.keys(cleanCopy)) ? null : cleanCopy
    }
    case 'array':
      return val.filter(v => Ember.isPresent(v))
    default:
      return val
  }
}

/**
 * flattens a multidimensional array
 *
 * @example flatten([[[1],2], 3]) => [1, 2, 3]
 *
 * @param  {Array} arr the array to flatten
 * @return {Array}     the flattened array
 */
export const flatten = arr => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])

/**
 * sums an array of values using reduction and parseFloat
 * @param  {Array} arr the array of values to sum
 * @return {Number}    the result
 */
export const sum = arr => arr.reduce((accum, amount) => accum + (parseFloat(amount) || 0), 0)
