import Ember from 'ember'

/**
 * Molecule for representing a numeric value as either
 * red (negative) or green (positive).
 *
 * Zero is not rendered by default, but it can with renderZero=true.
 * Zero is rendered in default text color, which is currently black.
 */
export default Ember.Component.extend({
  tagName: 'p',
  renderZero: false,
  classNameBindings: ['isPositive:text--plus', 'isNegative:text--minus'],

  renderNumber: Ember.computed('{change,renderZero}', function() {
    return this.get('renderZero') || this.get('change') !== 0
  }),

  change: Ember.computed('{new,old}', function() {
    return this.get('new') - this.get('old')
  }),

  isPositive: Ember.computed('change', function() {
    return this.get('change') > 0
  }),

  isNegative: Ember.computed('change', function() {
    return this.get('change') < 0
  })
})
