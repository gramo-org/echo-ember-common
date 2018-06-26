import Ember from 'ember'
import layout from '../../templates/components/atoms/drilldown-tr'

export default Ember.Component.extend({
  layout,
  tagName: 'tr',
  classNameBindings: ['isOpen:dd-open', 'isClosed:dd-close'],
  isOpen: null,
  isClosed: null,
  attributeBindings: ['level:data-level', 'hidden'],
  level: 1,
  hidden: Ember.computed('level', 'isOrphan', function() {
    if (this.get('level') === 1) {
      return null
    }
    return this.get('isOrphan') ? null : true
  }),

  didRender(...args) {
    this._super(...args)
    Ember.run.scheduleOnce('afterRender', this, 'setHasChild')
    Ember.run.scheduleOnce('afterRender', this, 'setIsOrphan')
  },

  setHasChild() {
    const hasChild = this.$().next('tr').data('level') > this.get('level')
    this.set('hasChild', hasChild)
    if (hasChild || this.get('loadData')) {
      this.set('isClosed', true)
    }
  },

  setIsOrphan() {
    const parentLevel = this.get('level') - 1
    const hasParent = this.$().prevAll(`tr[data-level="${parentLevel}"]`).get(0)
    this.set('isOrphan', !hasParent)
  },

  async click(event) {
    if (!this.get('isOpen') && this.get('loadData')) {
      if (this.get('isLoadingData')) { return }

      this.set('isLoadingData', true)
      this.toggleProperty('isOpen')

      try {
        const result = await this.get('loadData')()
        if (result !== false) {
          this.set('hasChild', true)
          return Ember.run.next(this, this._click, event)
        }
      } finally {
        this.set('isLoadingData', false)
      }
    } else {
      this.toggleProperty('isOpen')
    }
    return this._click(event)
  },

  _click(event) {
    const targetIsInput = Ember.$(event.target).is('input, select, button, a')
    const isChildless = !this.get('hasChild')

    if (isChildless || targetIsInput) {
      // do not toggle if user focused on an input element and skip elements without children
      return
    }
    const component = this
    this.$().nextAll('tr').each(function() {
      const $el = Ember.$(this)
      if ($el.data('level') <= component.get('level')) {
        // break the loop if level is same or higher
        return false
      }
      if ($el.data('level') > component.get('level')) {
        const isClosing = $el.is(':visible')
        if (isClosing || $el.data('level') === component.get('level') + 1) {
          // close all higher level siblings and only show first level higher siblings
          $el.prop('hidden', isClosing)
        }
      }
    })
    return true
  }
})
