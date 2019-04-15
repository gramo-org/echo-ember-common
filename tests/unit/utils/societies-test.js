import { module, test } from 'qunit'

import { gramoId, isGramo } from 'echo-ember-common/utils/societies'

module('Unit | Utility | Societies helpers', function() {
  const gramoSocietyId = '3b03d056-12a9-427d-8486-893e7c73bd45'
  const samiSocietyId = '5edff85d-014c-4f1f-a226-31e386d76a37'

  test('gramoId equals the society id for gramo', function(assert) {
    assert.equal(gramoId, gramoSocietyId)
  })

  test('isGramo returns true for gramo\'s id and false for other ids', function(assert) {
    assert.ok(isGramo(gramoSocietyId))
    assert.notOk(isGramo(samiSocietyId))
  })
})
