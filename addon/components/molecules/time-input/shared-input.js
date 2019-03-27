import Component from '@ember/component'
import layout from '../../../templates/components/molecules/time-input/shared-input'

export default Component.extend({
  layout,
  tagName: '',

  actions: {
    onlyNumbers() {
      if (event.which < 48 || event.which > 57)
      {
        event.preventDefault()
      }
    }
  }
})
