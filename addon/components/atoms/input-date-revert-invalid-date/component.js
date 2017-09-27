import Ember from 'ember'
import moment from 'moment'

/**
 * This component represents a date field and it's value must be a valid date
 *
 * If the user tries to clear the date, or delete parts of the date, for instance
 * the date's month, the value will be reset to the previosly valid date when the component loses focus
 *
 * If given a min or max value, this will be forwarded to the HTML5 date input field.
 * The min and max value will be displayed in the native calendar widget.
 *
 * If the user types a date that is before min or after max, the component
 * assigns the 'has-error' class to the input element. This is a signal to the
 * user that the date is outside the accepted range.
 *
 * The `value` field is validated and updated on `change#`,
 * but the value in the input field is only reset when it loses focus.
 * It is then reset to the last valid value.
 *
 * Use it if you have a date field which must contain a date
 *
 * @param canBeEmpty: set to `true` if you want to allow empty date values
 * @param onChange#: this method gets called when the component loses focus
 * and passes the event that caused it
 */
export default Ember.Component.extend({
  tagName: 'input',
  classNames: 'form__input',
  attributeBindings: ['type', 'value', 'disabled', 'min', 'max'],
  classNameBindings: ['hasError:has-error'],
  type: 'date',
  min: null,
  max: null,
  hasError: false,
  canBeEmpty: false,

  change({target}) {
    if (target.checkValidity() && this.allowedValue(target.value)) {
      this.set('hasError', !this._dateInAcceptedRange(target.value))
      this.set('value', target.value)
    }
  },
  allowedValue(value) {
    return this.get('canBeEmpty') ? true : (value && value.length)
  },
  focusOut(event) {
    this.element.value = this.get('value')
    if (this.attrs.onChange) {
      this.attrs.onChange(event)
    }
  },

  _dateInAcceptedRange(date) {
    return this._sameOrAfterMinDate(date) && this._sameOrBeforeMaxDate(date)
  },

  _sameOrAfterMinDate(date) {
    const min = this.get('min')
    if (!min) {
      return true
    }
    return moment(date).isSameOrAfter(min)
  },

  _sameOrBeforeMaxDate(date) {
    const max = this.get('max')
    if (!max) {
      return true
    }
    return moment(date).isSameOrBefore(max)
  }
})
