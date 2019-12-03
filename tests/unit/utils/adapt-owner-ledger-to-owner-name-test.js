import { module, test } from 'qunit'
import adaptOwnerLedgerToOwnerName from 'echo-ember-common/utils/adapt-owner-ledger-to-owner-name'

module('Unit | Utility | Adapt owner ledger to owner name')

test('it returns name for organization', function(assert) {
  assert.equal(adaptOwnerLedgerToOwnerName({ name: 'test' }), 'test')
})

test('it returns name for person', function(assert) {
  const owner = {
    person: {
      firstName: 'first name',
      lastName: 'last name'
    }
  }
  assert.equal(adaptOwnerLedgerToOwnerName(owner), 'first name last name')
})

test('it returns name for person when keys are underscored', function(assert) {
  const owner = {
    person: {
      first_name: 'first name',
      last_name: 'last name'
    }
  }
  assert.equal(adaptOwnerLedgerToOwnerName(owner), 'first name last name')
})

test('it returns name for person when keys are in both underscore and camelcase format', function(assert) {
  const owner = {
    person: {
      firstName: 'firstC',
      lastName: 'lastC',
      first_name: 'firstU',
      last_name: 'lastU'
    }
  }
  assert.equal(adaptOwnerLedgerToOwnerName(owner), 'firstC lastC')
})

test('it returns null if there are no first name or last name properties', function(assert) {
  const owner = {
    person: {}
  }
  assert.equal(adaptOwnerLedgerToOwnerName(owner), null)
})

test('it returns the name for the debtor', function(assert) {
  const owner = {
    debtor: {
      firstName: 'first name',
      lastName: 'last name'
    }
  }
  assert.equal(adaptOwnerLedgerToOwnerName(owner), 'first name last name')
})
