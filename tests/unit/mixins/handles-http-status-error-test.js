import EmberObject from '@ember/object'
import HandlesHttpStatusErrorMixin from 'echo-ember-common/mixins/handles-http-status-error'
import { module, test } from 'qunit'
import Service from '@ember/service'
import { setupTest } from 'ember-qunit'
import { inject as service } from '@ember/service'

module('Unit | Mixin | handles http status error', function(hooks) {
  setupTest(hooks)
  const I18n = Service.extend({
    t(key) {
      return `${key} - translated`
    }
  })

  const Session = Service.extend({
    init(...args) {
      this._super(...args)
      this.invalidated = false
    },
    invalidate() {
      this.invalidated = true
    }
  })

  const FlashMessages = Service.extend({
    init(...args) {
      this._super(...args)
      this.clear()
    },
    error(msg) {
      this.errorMessages.push(msg)
    },
    clear() {
      this.errorMessages = []
    }
  })
  hooks.beforeEach(function() {
    const HandlesHttpStatusErrorObject = EmberObject.extend(HandlesHttpStatusErrorMixin, {
      transitionTo(route) {
        this.transitionedTo = route
      },
      session: service()
    })
    this.owner.register('test:subject', HandlesHttpStatusErrorObject)
    this.owner.register('service:i18n', I18n)
    this.owner.register('service:session', Session)
    this.owner.register('service:flashMessages', FlashMessages)
    this.subject = this.owner.lookup('test:subject')
  })

  // function createSubject() {
  //   const HandlesHttpStatusErrorObject = EmberObject.extend(HandlesHttpStatusErrorMixin, {
  //     transitionTo(route) {
  //       this.transitionedTo = route
  //     }
  //   })
  //   return HandlesHttpStatusErrorObject.create()
  // }

  test('does nothing on no errors', function(assert) {
    const error = { errors: [] }
    const subject = this.subject

    assert.equal(subject.handleHttpStatusError(error), true, 'does nothing when no errors')
  })

  test('does nothing on 500 internal server error', function(assert) {
    const error = { errors: [{ status: '500' }] }
    const subject = this.subject

    assert.equal(subject.handleHttpStatusError(error), true, 'does nothing when no errors')
    assert.deepEqual(subject.get('flashMessages.errorMessages'), [], 'no error flash')
  })

  test('handles 401 unauthorized error', function(assert) {
    const error = { errors: [{ status: '401' }] }
    const subject = this.subject

    assert.equal(subject.handleHttpStatusError(error), false, 'is handled by mixin')
    assert.deepEqual(
      subject.get('flashMessages.errorMessages'),
      ['flash.http_codes.unauthorized - translated'],
      'flash message is translated'
    )

    assert.equal(subject.session.invalidated, true, 'session is invalidated')
    assert.equal(subject.transitionedTo, 'login', 'transitioned to login route')
  })

  test('handles 409 conflict error', function(assert) {
    const error = { errors: [{ status: '409' }] }
    const subject = this.subject

    assert.equal(subject.handleHttpStatusError(error), false, 'is handled by mixin')
    assert.deepEqual(
      subject.get('flashMessages.errorMessages'),
      ['flash.http_codes.conflict - translated'],
      'flash message is translated'
    )
  })

  test('handles 503 conflict error', function(assert) {
    const error = { errors: [{ status: '503' }] }
    const subject = this.subject

    assert.equal(subject.handleHttpStatusError(error), false, 'is handled by mixin')
    assert.deepEqual(
      subject.get('flashMessages.errorMessages'),
      ['flash.http_codes.service_unavailable - translated'],
      'flash message is translated'
    )
  })
})
