import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('atoms/drilldown-tr', 'Integration | Component | atoms/drilldown tr', {
  integration: true
})

/* eslint-disable no-magic-numbers */
test('it renders', function(assert) {
  // Template block usage:
  this.render(hbs`
    <table>
    {{#atoms/drilldown-tr level=2}}<td>orphan lvl2</td>{{/atoms/drilldown-tr}}
    {{#atoms/drilldown-tr level=1}}<td>lvl1</td>{{/atoms/drilldown-tr}}
    {{#atoms/drilldown-tr level=2}}<td>lvl2</td>{{/atoms/drilldown-tr}}
    {{#atoms/drilldown-tr level=3}}<td>lvl3</td>{{/atoms/drilldown-tr}}
    {{#atoms/drilldown-tr level=2}}<td>lvl2</td>{{/atoms/drilldown-tr}}
    </table>
  `)

  assert.equal(this.$('table tr:visible').length, 2, 'has only top level and orphan row initially shown')
  assert.ok(this.$('table tr:visible td:contains(lvl1)').length, 'top level row initially shown')
  assert.ok(this.$('table tr:visible td:contains(orphan lvl2)').length, 'orphan row initially shown')

  this.$('td:contains(lvl1)').click()
  assert.equal(this.$('table tr:visible').length, 4, 'shows next level when clicked')
  assert.notOk(this.$('table tr:visible td:contains(lvl3)').length, 'shows next level when clicked')

  this.$('td:contains(lvl2)').click()
  assert.equal(this.$('table tr:visible').length, 5, 'shows last level when clicked')
  assert.ok(this.$('table tr:visible td:contains(lvl3)').length, 'shows last level when clicked')
})
