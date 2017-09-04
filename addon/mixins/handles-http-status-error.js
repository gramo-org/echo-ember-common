import Ember from 'ember'

export default Ember.Mixin.create({
  i18n: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  /**
  * Handles various types of server errors denoted by
  * HTTP status codes.
  *
  * It follows the convention of Ember error event handlers,
  * returning true IF the client of this method must handle
  * the error, and false if the error has been handled.
  *
  * @return {boolean}  True when you need to handle the error yourself.
  *                    False when error is taken care of by this mixin.
  */
  handleHttpStatusError(error) {
    return !(
      this._handleUnauthorizedError(error) ||
      this._handleConflictError(error) ||
      this._handleServiceUnavailableError(error)
    )
  },

  _handleUnauthorizedError(error) {
    if (this._flashOnError(error, '401', 'flash.http_codes.unauthorized')) {
      this.get('session').invalidate()
      this.transitionTo('login')
      return true
    }

    return false
  },

  _handleConflictError(error) {
    return this._flashOnError(error, '409', 'flash.http_codes.conflict')
  },

  _handleServiceUnavailableError(error) {
    return this._flashOnError(error, '503', 'flash.http_codes.service_unavailable')
  },

  _flashOnError(error, code, messageKey) {
    if (this._containsStatusCode(error, code)) {
      this.get('flashMessages').error(this.get('i18n').t(messageKey))
      return true
    }

    return false
  },

  _containsStatusCode({ errors }, code) {
    return errors && errors.find((err) => err.status === code)
  }

})
