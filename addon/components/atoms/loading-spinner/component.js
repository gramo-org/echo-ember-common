import Ember from 'ember'
import layout from './template'

export default Ember.Component.extend({
  layout,
  classNames: 'spinner',
  /**
   Adds the --minimal modifier class which removes margins and set height to 25px
   */
  classNameBindings: 'isMinimal:spinner--minimal',
  isMinimal: false,
})
