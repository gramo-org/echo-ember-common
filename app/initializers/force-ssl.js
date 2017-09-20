import ENV from '../config/environment'

export function initialize() {
  if (ENV.forceSsl && window.location.protocol.indexOf('https') === -1) {
    window.location.href = `https:${window.location.href.substr(window.location.protocol.length)}`
  }
}

export default {
  name: 'force-ssl',
  initialize
}
