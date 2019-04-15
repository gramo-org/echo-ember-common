import { getJWTPayload } from 'echo-ember-common/utils/jtw-helpers'
import { module, test } from 'qunit'

module('Unit | Utility | jtw helpers', function() {
  test('it returns JWT payload', function(assert) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Q6CM1qIz2WTgTlhMzpFL8jI8xbu9FFfj5DY_bGVY98Y'
    const payload = getJWTPayload(token)

    assert.deepEqual(payload, {sub: '1234567890', name: 'John Doe'})
  })
})
