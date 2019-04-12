import Component from '@ember/component'
import { durationAsHms } from 'echo-ember-common/helpers/duration-as-hms'
import layout from '../../templates/components/molecules/time-input'

export default Component.extend({
  layout,

  tagName: 'fieldset',
  classNames: 'form__fieldset time-input',
  'data-test-time-input': true,

  init(...args) {
    this._super(...args)
    this.setProperties({
      hours: '',
      minutes: '',
      seconds: '',
    })
  },

  didReceiveAttrs() {
    if (!this.get('value')) return

    const [
      hours, minutes, seconds,
    ] = durationAsHms([this.get('value')], { showHours: true })
      .split(':')
      .map(item => parseInt(item, 10))

    this.setProperties({ hours, minutes, seconds })
  },

  actions: {
    change(type, value) {
      const parsedValue = parseInt(value, 10)
      this.set(type, isNaN(parsedValue) ? 0 : parsedValue)

      const duration = this.get('seconds') * 1 + this.get('minutes') * 60 + this.get('hours') * 3600

      this.get('onChange')(duration)
    }
  },
})
