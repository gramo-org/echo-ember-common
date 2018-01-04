import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('molecules/amount-change', 'Integration | Component | molecules/amount change', {
  integration: true
})

test('it renders', function(assert) {
  this.render(hbs`{{molecules/amount-change new=5 old=10}}`)
  assert.equal(this.$('p.text--minus').text().trim(), '-5.00')

  this.render(hbs`{{molecules/amount-change new=10 old=5}}`)
  assert.equal(this.$('p').text().trim(), '5.00')

  this.render(hbs`{{molecules/amount-change new=10 old=10}}`)
  assert.equal(this.$('p').text().trim(), '')
})
