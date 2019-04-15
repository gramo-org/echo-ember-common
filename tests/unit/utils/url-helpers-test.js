import { module, test } from 'qunit'

import {
  urlFor,
  pathFor,
  toQueryString
} from 'echo-ember-common/utils/url-helpers'

module('Unit | Utility | url helpers pathFor', function() {
  test('concatinates part with /', function(assert) {
    assert.equal(pathFor('foo', 'bar'), 'foo/bar')
  })

  test('removes empty parts', function(assert) {
    assert.equal(pathFor('foo', '', null, undefined, 'bar'), 'foo/bar')
  })

  test('takes parts as array', function(assert) {
    assert.equal(pathFor(['foo', 'bar']), 'foo/bar')
  })

  test('has no double slashes', function(assert) {
    assert.equal(pathFor('foo/', 'bar'), 'foo/bar')
  })
})

module('Unit | Utility | url helpers urlFor', function() {
  test('concatinates part with /', function(assert) {
    const backends = {
      testBackend: {
        host: 'http://example.com',
        namespace: 'api'
      }
    }

    assert.equal(urlFor('foo/bar', 'testBackend', backends), 'http://example.com/api/foo/bar')
  })

  test('handles a few extra /', function(assert) {
    const backends = {
      testBackend: {
        host: 'http://example.com/',
        namespace: '/api/'
      }
    }

    assert.equal(urlFor('/foo/bar/', 'testBackend', backends), 'http://example.com/api/foo/bar')
  })
})

module('Unit | Utility | url helpers toQueryString', function() {
  test('it returns empty string for empty object', function(assert) {
    assert.equal(toQueryString({}), '')
  })

  test('it returns correct string for one element', function(assert) {
    assert.equal(toQueryString({foo: 'bar'}), 'foo=bar')
  })

  test('it returns correct string for multiple element', function(assert) {
    assert.equal(toQueryString({foo: 'bar', baz: 1}), 'foo=bar&baz=1')
  })
})
