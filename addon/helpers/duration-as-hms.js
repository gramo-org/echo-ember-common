import Ember from 'ember'
import moment from 'moment'

const defaultPadLength = -2
const secondsInAnHour = 3600

function zeroPad(n, padLength = defaultPadLength) {
  const doubleDigit = 10

  if (n >= doubleDigit) {
    return n
  }
  return `0${n}`.slice(padLength)
}

/**
 * Returns given number on format hh:mm:ss
 *
 * @param  {Array}    params    First value is the number
 * @param  {Object}   options
 *                              showHours - defaults to true
 *                                if you want to not render the
 *                                hours set it to false.
 *                                The hours will be rendered if it overflows an hour.
 * @return {String}             hh:mm:ss or mm:ss
 */
export function durationAsHms(params, options = {}) {
  if (Ember.isBlank(params[0])) { return null }
  const seconds = parseInt(params[0], 10)

  const mustShowHours = seconds >= secondsInAnHour
  const showHours = options.showHours !== false || mustShowHours

  const duration = moment.duration(seconds, 'seconds')

  const out = [
    duration.minutes(),
    duration.seconds()
  ]

  if (showHours) {
    out.unshift(Math.floor(duration.asHours()))
  }

  return out.map(n => zeroPad(n)).join(':')
}


export default Ember.Helper.helper(durationAsHms)
