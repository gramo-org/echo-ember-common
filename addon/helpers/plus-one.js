import Ember from 'ember'

export function plusOne(params) {
  return parseInt(params, 10) + 1
}

export default Ember.Helper.helper(plusOne)
