import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../../templates/components/molecules/amount-change'

/**
 * Molecule for representing a numeric value as either
 * red (negative) or green (positive).
 *
 * Zero is not rendered by default, but it can with renderZero=true.
 * Zero is rendered in default text color, which is currently black.
 */
export default Component.extend({
  layout,
  tagName: 'p',
  renderZero: false,
  classNameBindings: ['isPositive:text--plus', 'isNegative:text--minus'],

  renderNumber: computed('{change,renderZero}', function() {
    return this.get('renderZero') || this.get('change') !== 0
  }),

  change: computed('{new,old}', function() {
    return this.get('new') - this.get('old')
  }),

  isPositive: computed('change', function() {
    return this.get('change') > 0
  }),

  isNegative: computed('change', function() {
    return this.get('change') < 0
  })
})
