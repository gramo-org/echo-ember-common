import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('molecules/diff-values', 'Integration | Component | molecules/diff values', {
  integration: true
})

test('it renders', function(assert) {
  this.render(hbs`{{molecules/diff-values new=5 old=10}}`)

  assert.ok(this.$('p:contains(5)').length, 'shows new value')
  assert.ok(this.$('p.text--light.text--strike:contains(10)').length, 'shows old value')
})
