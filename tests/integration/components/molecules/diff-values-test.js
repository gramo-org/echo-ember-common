import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | molecules/diff values', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{molecules/diff-values new=5 old=10}}`)

    assert.ok(this.$('p:contains(5)').length, 'shows new value')
    assert.ok(this.$('p.text--light.text--strike:contains(10)').length, 'shows old value')
  })
});
