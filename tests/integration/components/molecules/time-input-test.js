import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import { find, fillIn } from 'ember-native-dom-helpers'
import sinon from 'sinon'

moduleForComponent('Integration | Component | time input', {
  integration: true,
})

test('it sends proper value on change', async function(assert) {
  this.set('onChange', sinon.spy())

  await this.render(hbs`{{molecules/time-input onChange=onChange}}`)

  await fillIn('[data-test-time-input-type="hours"]', 0)
  await fillIn('[data-test-time-input-type="minutes"]', 3)
  await fillIn('[data-test-time-input-type="seconds"]', 10)

  assert.ok(find('[data-test-time-input]'))
  assert.ok(this.onChange.lastCall.args[0], 190)
})

test('it fills value from seconds properly', async function(assert) {
  await this.render(hbs`{{molecules/time-input value=190}}`)

  assert.equal(find('[data-test-time-input-type="hours"]').value, 0)
  assert.equal(find('[data-test-time-input-type="minutes"]').value, 3)
  assert.equal(find('[data-test-time-input-type="seconds"]').value, 10)
})
