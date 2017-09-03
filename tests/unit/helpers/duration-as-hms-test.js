/* eslint no-magic-numbers: off */
import { durationAsHms } from 'echo-ember-common/helpers/duration-as-hms'
import { module, test } from 'qunit'

module('unit:duration-as-hms')

const secInOneHour = 3600
const secInDay = secInOneHour * 24

test('renders duration as expected', function(assert) {
  assert.equal(durationAsHms([null]), null)
  assert.equal(durationAsHms([0]), '00:00:00')
  assert.equal(durationAsHms([1]), '00:00:01')
  assert.equal(durationAsHms([61]), '00:01:01')
  assert.equal(durationAsHms([secInOneHour]), '01:00:00')
  assert.equal(durationAsHms([(secInOneHour * 2) + 65]), '02:01:05')
  assert.equal(durationAsHms([(secInOneHour * 24) + 1]), '24:00:01')
  assert.equal(durationAsHms([(secInOneHour * 36) + 126]), '36:02:06')
  assert.equal(durationAsHms([(secInDay * 400)]), '9600:00:00')
  assert.equal(durationAsHms([(8327552)]), '2313:12:32')
})

test('can drop hours when requested', function(assert) {
  assert.equal(durationAsHms([0], {showHours: false}), '00:00')
  assert.equal(durationAsHms([61], {showHours: false}), '01:01')
  assert.equal(durationAsHms([secInOneHour - 1], {showHours: false}), '59:59')
})

test('renders hours when asked not to if given time is more than an hour', function(assert) {
  assert.equal(durationAsHms([secInOneHour], {showHours: false}), '01:00:00')
})
