import { deprecate } from '@ember/application/deprecations'
import {
  getWithDefault,
  observer,
  computed,
  set,
  get
} from '@ember/object'
import Component from '@ember/component'
import layout from '../templates/components/async-button'

const positionalParamsMixin = {
  positionalParams: 'params'
}

const ButtonComponent = Component.extend(positionalParamsMixin, {
  layout,
  tagName: 'button',
  textState: 'default',
  asyncState: computed.alias('default'),
  reset: false,
  classNames: ['async-button'],
  classNameBindings: ['textState'],
  attributeBindings: ['disabled', 'type', '_href:href', 'tabindex'],

  type: 'submit',

  init() {
    this._super(...arguments)
    const deprecationMessage = '`ember-async-button` has been deprecated and will no longer be supported.'
    deprecate(deprecationMessage, false, { id: 'ember-async-button.deprecate-addon', until: 'forever' })
  },

  disabled: computed('textState', 'disableWhen', function() {
    const textState = get(this, 'textState')
    const disableWhen = get(this, 'disableWhen')
    return disableWhen || textState === 'pending'
  }),

  click() {
    const params = getWithDefault(this, 'params', [])
    const callbackHandler = (promise) => {
      set(this, 'promise', promise)
    }

    if (typeof this.attrs.action === 'function') {
      const deprecatingCallbackHandler = function(promise) {
        deprecate(`When using closure style actions with ember-async-button,
please return the promise instead of using the callback argument.
The callback for closure actions will be removed in future versions.`,
        false,
        { id: 'ember-async-button.action-callback', until: '0.8.0' })

        callbackHandler(promise)
      }

      const promise = this.attrs.action(deprecatingCallbackHandler, ...params)

      if (promise && typeof promise.then === 'function') {
        callbackHandler(promise)
      }
    } else {
      const actionArguments = ['action', callbackHandler, ...params]

      this.sendAction(...actionArguments)
    }

    set(this, 'textState', 'pending')

    // If this is part of a form, it will perform an HTML form
    // submission without returning false to prevent action bubbling
    return false
  },

  text: computed('textState', 'default', 'pending', 'resolved', 'fulfilled', 'rejected', function() {
    return getWithDefault(this, this.textState, get(this, 'default'))
  }),

  resetObserver: observer('textState', 'reset', function() {
    const states = ['resolved', 'rejected', 'fulfilled']
    let found = false
    const textState = get(this, 'textState')

    for (let idx = 0; idx < states.length && !found; idx++) {
      found = (textState === states[idx])
    }

    if (get(this, 'reset') && found) {
      set(this, 'textState', 'default')
    }
  }),

  handleActionPromise: observer('promise', function() {
    const promise = get(this, 'promise')

    if (!promise) {
      return
    }

    promise.then(() => {
      if (!this.isDestroyed) {
        set(this, 'textState', 'fulfilled')
      }
    }).catch(() => {
      if (!this.isDestroyed) {
        set(this, 'textState', 'rejected')
      }
    })
  }),

  setUnknownProperty(key, value) {
    if (key === 'resolved') {
      deprecate('The \'resolved\' property is deprecated. Please use \'fulfilled\'', false)
      key = 'fulfilled'
    }

    this[key] = null
    this.set(key, value)
  },

  _href: computed('href', function() {
    const href = get(this, 'href')
    if (href) {
      return href
    }

    const tagName = get(this, 'tagName').toLowerCase()
    if (tagName === 'a' && href === undefined) {
      return ''
    }
  }),

  _stateObject: computed('textState', function() {
    const textState = get(this, 'textState')
    const isFulfilled = textState === 'fulfilled' || textState === 'resolved'
    return {
      isPending: textState === 'pending',
      isFulfilled,
      isResolved: isFulfilled,
      isRejected: textState === 'rejected',
      isDefault: textState === 'default'
    }
  })
})

// Ember 1.13.6 will deprecate specifying `positionalParams` on the
// instance in favor of class level property
//
// Having both defined keeps us compatible with Ember 1.13+ (all patch versions)
ButtonComponent.reopenClass(positionalParamsMixin)

export default ButtonComponent
