import { helper as buildHelper } from '@ember/component/helper'

export function plusOne(params) {
  return parseInt(params, 10) + 1
}

export default buildHelper(plusOne)
