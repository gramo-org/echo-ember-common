
import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('plus-one', 'helper:plus-one', {
  integration: true
})

test('it renders', function(assert) {
  this.render(hbs`{{plus-one 1}}`)
  assert.equal(this.$().text().trim(), '2')

  this.render(hbs`{{plus-one 3}}`)
  assert.equal(this.$().text().trim(), '4')

  this.render(hbs`{{plus-one '99'}}`)
  assert.equal(this.$().text().trim(), '100')
})
