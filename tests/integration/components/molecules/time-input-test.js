import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'
import { fillIn } from '@ember/test-helpers'
import sinon from 'sinon'

module('Integration | Component | time input', function(hooks) {
  setupRenderingTest(hooks)

  test('on init', async function(assert) {
    this.set('onChange', sinon.spy())
    await this.render(hbs`{{molecules/time-input value=3735 onChange=onChange}}`)

    assert.dom('[data-test-time-input-type="hours"]').hasValue('1') // eslint-disable-line no-magic-numbers
    assert.dom('[data-test-time-input-type="minutes"]').hasValue('2') // eslint-disable-line no-magic-numbers
    assert.dom('[data-test-time-input-type="seconds"]').hasValue('15') // eslint-disable-line no-magic-numbers
  })

  test('it sends proper value on change', async function(assert) {
    this.set('onChange', sinon.spy())

    await this.render(hbs`{{molecules/time-input onChange=onChange}}`)

    await fillIn('[data-test-time-input-type="hours"]', 0) // eslint-disable-line no-magic-numbers
    await fillIn('[data-test-time-input-type="minutes"]', 3) // eslint-disable-line no-magic-numbers
    await fillIn('[data-test-time-input-type="seconds"]', 10) // eslint-disable-line no-magic-numbers

    assert.dom('[data-test-time-input]').exists()
    assert.equal(this.onChange.lastCall.args[0], 190) // eslint-disable-line no-magic-numbers
  })

  test('it fills value from seconds properly', async function(assert) {
    await this.render(hbs`{{molecules/time-input value=190}}`)

    assert.dom('[data-test-time-input-type="hours"]').hasValue('0') // eslint-disable-line no-magic-numbers
    assert.dom('[data-test-time-input-type="minutes"]').hasValue('3') // eslint-disable-line no-magic-numbers
    assert.dom('[data-test-time-input-type="seconds"]').hasValue('10') // eslint-disable-line no-magic-numbers
  })
})
