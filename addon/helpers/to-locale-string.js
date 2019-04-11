import { helper as buildHelper } from '@ember/component/helper';
import { assign } from '@ember/polyfills';
import moment from 'moment'

/**
 * Handlebar wrapper for {@link Number#toLocaleString}
 *
 * Usage:
 * {{to-locale-string 3.145 minimumFractionDigits=1}}
 * => "3,1"
 * {{to-locale-string 3.145 style='currency' currency='NOK' minimumFractionDigits=2}}
 * => "kr 3,15"
 *
 */

/* eslint-disable no-magic-numbers */
export function toLocaleString([number, ..._rest], options) {
  const float = parseFloat(number)
  if (!isNaN(float)) {
    return float.toLocaleString(moment.locale(), assign({ minimumFractionDigits: 2 }, options));
  }
}

export default buildHelper(toLocaleString)
