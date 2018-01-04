import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import { toLocaleString } from 'echo-ember-common/helpers/to-locale-string'

/* eslint-disable no-magic-numbers */
moduleForComponent('molecules/amount-change', 'Integration | Component | molecules/amount change', {
  integration: true
})

test('it renders', function(assert) {
  this.render(hbs`{{molecules/amount-change new=5 old=10}}`)
  assert.equal(this.$('p.text--minus').text().trim(), toLocaleString([-5]))

  this.render(hbs`{{molecules/amount-change new=10 old=5}}`)
  assert.equal(this.$('p').text().trim(), toLocaleString([5]))

  this.render(hbs`{{molecules/amount-change new=10 old=10}}`)
  assert.equal(this.$('p').text().trim(), '')
})
