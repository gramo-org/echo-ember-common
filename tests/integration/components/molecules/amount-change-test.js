import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'
import { toLocaleString } from 'echo-ember-common/helpers/to-locale-string'

module('Integration | Component | molecules/amount change', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders', async function(assert) {
    await render(hbs`{{molecules/amount-change new=5 old=10}}`)
    assert.dom('p.text--minus').hasText(toLocaleString([-5])) // eslint-disable-line no-magic-numbers

    await render(hbs`{{molecules/amount-change new=10 old=5}}`)
    assert.dom('p').hasText(toLocaleString([5])) // eslint-disable-line no-magic-numbers

    await render(hbs`{{molecules/amount-change new=10 old=10}}`)
    assert.dom('p').hasText('')
  })
})
