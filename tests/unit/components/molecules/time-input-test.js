/* eslint no-magic-numbers: "off" */
import { moduleForComponent, test } from 'ember-qunit'
import sinon from 'sinon'

const onChangeSpy = sinon.spy()
const durationInSeconds = 3735

moduleForComponent('molecules/time-input', 'Unit | Component | time input', {
  unit: true,
})

test('on init', function(assert) {
  const component = this.subject({
    value: durationInSeconds,
    onChange: onChangeSpy,
  })

  assert.equal(
    component.get('hours'),
    1,
    'has hours property set properly on init'
  )

  assert.equal(
    component.get('minutes'),
    2,
    'has minutes property set properly on init'
  )

  assert.equal(
    component.get('seconds'),
    15,
    'has seconds property set properly on init'
  )
})

test('change action (valid value)', function(assert) {
  const component = this.subject({
    value: durationInSeconds,
    onChange: onChangeSpy,
  })

  component.send('change', 'minutes', '10')

  assert.equal(
    component.get('minutes'),
    10,
    'sets a given value to a given property'
  )

  assert.ok(
    onChangeSpy.calledWith(4215),
    'calls action passed to component with proper args: duration in seconds'
  )
})

test('change action (invalid value)', function(assert) {
  const component = this.subject({
    value: durationInSeconds,
    onChange: onChangeSpy,
  })

  component.send('change', 'minutes', 'ee')

  assert.equal(
    component.get('minutes'),
    0,
    'sets a zero (0) to given property if given value is not a number'
  )

  assert.ok(
    onChangeSpy.calledWith(3615),
    'calls action passed to component with proper args: duration in seconds'
  )
})
