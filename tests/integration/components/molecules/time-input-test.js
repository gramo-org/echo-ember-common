import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile'
import { find, fillIn } from 'ember-native-dom-helpers'
import sinon from 'sinon'

module('Integration | Component | time input', function(hooks) {
  setupRenderingTest(hooks);

  test('it sends proper value on change', async function(assert) {
    this.set('onChange', sinon.spy())

    await this.render(hbs`{{molecules/time-input onChange=onChange}}`)

    await fillIn('[data-test-time-input-type="hours"]', 0)
    await fillIn('[data-test-time-input-type="minutes"]', 3)
    await fillIn('[data-test-time-input-type="seconds"]', 10)

    assert.dom('[data-test-time-input]').exists()
    assert.equal(this.onChange.lastCall.args[0], 190)
  })

  test('it fills value from seconds properly', async function(assert) {
    await this.render(hbs`{{molecules/time-input value=190}}`)

    assert.dom('[data-test-time-input-type="hours"]').hasValue(0)
    assert.dom('[data-test-time-input-type="minutes"]').hasValue(3)
    assert.dom('[data-test-time-input-type="seconds"]').hasValue(10)
  })
});
