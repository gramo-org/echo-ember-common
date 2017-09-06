import Ember from 'ember'
import { module, test } from 'qunit'
import { deserialize, serializeObject } from 'echo-ember-common/utils/data-helpers'


module('data-helpers deserialize')

test('deserializes given json api array in to Ember Objects', function(assert) {
  const data = [
    {
      id: '1',
      type: 'some-type',
      attributes: {
        'first-name': 'Thorbjorn',
        'last-name': 'Hermansen',
        phone: '40404040',
        'some-nested': { value: 'works too' },
        'alternative-names': [{
          alternative_name: 'Th'
        }]
      }
    }
  ]

  const deserialized = deserialize(data)
  const expected = [
    Ember.Object.create({
      id: '1',
      firstName: 'Thorbjorn',
      lastName: 'Hermansen',
      phone: '40404040',
      someNested: Ember.Object.create({value: 'works too'}),
      alternativeNames: [Ember.Object.create({alternativeName: 'Th'})]
    })
  ]

  assert.deepEqual(deserialized, expected)
})

test('deserializes given json api array in to plain old objects', function(assert) {
  const data = [
    {
      id: '1',
      type: 'some-type',
      attributes: {
        'first-name': 'Thorbjorn',
        'last-name': 'Hermansen',
        phone: '40404040',
        'some-nested': { value: 'works too' },
        'alternative-names': [{
          alternative_name: 'Th'
        }]
      }
    }
  ]

  const deserialized = deserialize(data, false)
  const expected = [
    {
      id: '1',
      firstName: 'Thorbjorn',
      lastName: 'Hermansen',
      phone: '40404040',
      someNested: {value: 'works too'},
      alternativeNames: [{alternativeName: 'Th'}]
    }
  ]

  assert.deepEqual(deserialized, expected)
})

test('serializeObject transforms keys as expected', function(assert) {
  const data = [
    {
      id: '1',
      'first-name': 'Thorbjorn',
      'last-name': 'Hermansen',
      phone: '40404040',
      'some-nested': { valueWill: 'works too' },
      'alternative-names': [{
        alternative_name: 'Th'
      }]
    }
  ]

  const deserialized = serializeObject(data, Ember.String.underscore)
  const expected = [
    {
      id: '1',
      first_name: 'Thorbjorn',
      last_name: 'Hermansen',
      phone: '40404040',
      some_nested: {value_will: 'works too'},
      alternative_names: [{alternative_name: 'Th'}]
    }
  ]

  assert.deepEqual(deserialized, expected)
})
