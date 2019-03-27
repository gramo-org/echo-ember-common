import Component from '@ember/component'
import layout from '../../../templates/components/molecules/time-input/shared-input'

export default Component.extend({
  layout,
  tagName: '',

  actions: {
    onlyNumbers() {
      const ascii0 = 48
      const ascii9 = 57
      if (event.which < ascii0 || event.which > ascii9) event.preventDefault()
    }
  }
})
