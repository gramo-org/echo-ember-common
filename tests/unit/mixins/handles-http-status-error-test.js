import Ember from 'ember'
import HandlesHttpStatusErrorMixin from 'echo-ember-common/mixins/handles-http-status-error'
import { module, test } from 'qunit'

module('Unit | Mixin | handles http status error')

class I18n {
  t(key) { return `${key} - translated` }
}

class FlashMessages {
  constructor() {
    this.clear()
  }

  error(msg) {
    this.errorMessages.push(msg)
  }

  clear() {
    this.errorMessages = []
  }
}

function createSubject() {
  const HandlesHttpStatusErrorObject = Ember.Object.extend(HandlesHttpStatusErrorMixin, {
    i18n: new I18n(),
    flashMessages: new FlashMessages()
  })
  return HandlesHttpStatusErrorObject.create()
}

test('does nothing on no errors', function(assert) {
  const error = { errors: [] }
  const subject = createSubject()

  assert.equal(subject.handleHttpStatusError(error), true, 'does nothing when no errors')
})

test('does nothing on 500 internal server error', function(assert) {
  const error = { errors: [{status: '500'}] }
  const subject = createSubject()

  assert.equal(subject.handleHttpStatusError(error), true, 'does nothing when no errors')
  assert.deepEqual(subject.get('flashMessages.errorMessages'), [], 'no error flash')
})

test('handles 409 conflict error', function(assert) {
  const error = { errors: [{status: '409'}] }
  const subject = createSubject()

  assert.equal(subject.handleHttpStatusError(error), false, 'is handled by mixin')
  assert.deepEqual(
    subject.get('flashMessages.errorMessages'),
    ['flash.http_codes.conflict - translated'],
    'flash message is translated'
  )
})

test('handles 503 conflict error', function(assert) {
  const error = { errors: [{status: '503'}] }
  const subject = createSubject()

  assert.equal(subject.handleHttpStatusError(error), false, 'is handled by mixin')
  assert.deepEqual(
    subject.get('flashMessages.errorMessages'),
    ['flash.http_codes.service_unavailable - translated'],
    'flash message is translated'
  )
})
