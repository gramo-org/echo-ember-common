import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'
import { findAll, find, click } from 'ember-native-dom-helpers'
import {
  create,
  isVisible,
  collection,
  clickable
} from 'ember-cli-page-object'

const component = create({
  tableRows: collection('table tr', {}),
  firstLVL: {
    visible: isVisible('table tr td:contains(lvl1)'),
    click: clickable('table tr td:contains(lvl1)')
  },
  orphanLVL: {
    visible: isVisible('table tr td:contains(orphan lvl2)')
  },
  secondLVL: {
    click: clickable('table tr td:contains(lvl2)')
  },
  thirdLVL: {
    visible: isVisible('table tr td:contains(lvl3)')
  }
})

module('Integration | Component | atoms/drilldown tr', function(hooks) {
  setupRenderingTest(hooks)
  hooks.beforeEach(function() {
    component.setContext(this)
  })
  hooks.afterEach(function() {
    component.removeContext()
  })
  /* eslint-disable no-magic-numbers */
  test('it renders', async function(assert) {
    // Template block usage:
    await render(hbs`
      <table>
      {{#atoms/drilldown-tr level=2}}<td>orphan lvl2</td>{{/atoms/drilldown-tr}}
      {{#atoms/drilldown-tr level=1}}<td>lvl1</td>{{/atoms/drilldown-tr}}
      {{#atoms/drilldown-tr level=2}}<td>lvl2</td>{{/atoms/drilldown-tr}}
      {{#atoms/drilldown-tr level=3}}<td>lvl3</td>{{/atoms/drilldown-tr}}
      {{#atoms/drilldown-tr level=2}}<td>lvl2</td>{{/atoms/drilldown-tr}}
      </table>
    `)
    assert.equal(
      component.tableRows.filter(row => row.isVisible).length,
      2,
      'has only top level and orphan row initially shown'
    )
    assert.ok(component.firstLVL.visible, 'top level row initially shown')
    assert.ok(component.orphanLVL.visible, 'orphan row initially shown')
    await component.firstLVL.click()
    assert.equal(
      component.tableRows.filter(row => row.isVisible).length,
      4,
      'shows next level when clicked'
    )
    assert.notOk(component.thirdLVL.visible, 'does not show the third lvl yet')
    await component.secondLVL.click()
    assert.equal(
      component.tableRows.filter(row => row.isVisible).length,
      5,
      'shows last level when clicked'
    )
    assert.ok(component.thirdLVL.visible, 'shows last level when clicked')
  })
})
