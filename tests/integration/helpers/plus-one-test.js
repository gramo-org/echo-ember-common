
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile'

module('helper:plus-one', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{plus-one 1}}`)
    assert.dom('*').hasText('2')

    await render(hbs`{{plus-one 3}}`)
    assert.dom('*').hasText('4')

    await render(hbs`{{plus-one '99'}}`)
    assert.dom('*').hasText('100')
  })
});
