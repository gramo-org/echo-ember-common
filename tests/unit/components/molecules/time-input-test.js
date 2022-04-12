import { module, test } from 'qunit'
/* eslint no-magic-numbers: "off" */
import { setupTest } from 'ember-qunit'
import sinon from 'sinon'

const onChangeSpy = sinon.spy()

module('Unit | Component | time input', function(hooks) {
  setupTest(hooks)

  test('change action (valid value)', function(assert) {
    const component = this.owner.factoryFor('component:molecules/time-input').create({
      onChange: onChangeSpy,
    })

    component.send('change', 'minutes', '10')

    assert.equal(
      component.get('minutes'),
      10,
      'sets a given value to a given property'
    )

    assert.ok(
      onChangeSpy.calledWith(600),
      'calls action passed to component with proper args: duration in seconds'
    )
  })

  test('change action (invalid value)', function(assert) {
    const component = this.owner.factoryFor('component:molecules/time-input').create({
      onChange: onChangeSpy
    })

    component.send('change', 'minutes', 'ee')

    assert.equal(
      component.get('minutes'),
      0,
      'sets a zero (0) to given property if given value is not a number'
    )

    assert.ok(
      onChangeSpy.calledWith(0),
      'calls action passed to component with proper args: duration in seconds'
    )
  })
})
