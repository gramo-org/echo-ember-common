import { reject } from 'rsvp';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';
import HandlesHttpStatusErrorMixin from 'echo-ember-common/mixins/handles-http-status-error'

/**
 * This mixin handles showing flash messages in the relevant scenarios of
 * a save operation. There are three cases where flash messages are shown:
 *   1. the save was a success
 *   2. the save failed
 *   3. the save was rejected due to a validation errors
 *
 * Example usage:
 *   const promise = model.save()
 *   this.handleSaveWithFlash(promise)
 *
 * Note that the invalid check can be replaced with proper 422 check when
 * ds-extended-errors lands.
 */
export default Mixin.create(HandlesHttpStatusErrorMixin, {
  i18n: service(),

  handleSaveWithFlash(promise) {
    return promise.then(() => {
      this.get('flashMessages').success(this.get('i18n').t('flash.save.success'))
    }).catch((e) => {
      const isValidationError = e.validationErrors || // GraphQL rejection
        (e.message && e.message.match(/invalid/)) // Ember data rejection

      if (isValidationError) {
        this.get('flashMessages').error(this.get('i18n').t('flash.save.invalid'))
      } else {
        if (this.handleHttpStatusError(e)) {
          this.get('flashMessages').error(this.get('i18n').t('flash.save.failed'))
        }
        return reject(e);
      }
    });
  }
})
