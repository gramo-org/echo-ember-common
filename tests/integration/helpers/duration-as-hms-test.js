import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('helper:duration-as-hms', function(hooks) {
  setupRenderingTest(hooks)

  test('it renders correctly', async function(assert) {
    await render(hbs`{{duration-as-hms 60}}`)
    assert.dom('*').hasText('00:01:00')

    await render(hbs`{{duration-as-hms 121 showHours=false}}`)
    assert.dom('*').hasText('02:01')
  })
})
