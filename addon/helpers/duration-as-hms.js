import Ember from 'ember'
import moment from 'moment'

const defaultPadLength = -2

function zeroPad(n, padLength = defaultPadLength) {
  const doubleDigit = 10

  if (n >= doubleDigit) {
    return n
  }
  return `0${n}`.slice(padLength)
}

export function durationAsHms(params) {
  if (Ember.isBlank(params[0])) { return null }
  const seconds = parseInt(params[0], 10)
  const duration = moment.duration(seconds, 'seconds')

  return [
    Math.floor(duration.asHours()),
    duration.minutes(),
    duration.seconds()
  ].map(n => zeroPad(n)).join(':')
}


export default Ember.Helper.helper(durationAsHms)
