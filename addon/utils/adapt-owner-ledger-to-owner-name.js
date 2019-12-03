import { get } from '@ember/object'
import { isPresent } from '@ember/utils'

const nameForOrganization = function(owner) {
  return get(owner, 'name')
}

const nameForPerson = function(owner) {
  const name = [
    get(owner, 'person.firstName') || get(owner, 'person.first_name'),
    get(owner, 'person.lastName') || get(owner, 'person.last_name')
  ].filter(name => isPresent(name)).join(' ')

  if (isPresent(name)) {
    return name
  }
}

const nameForGarnishment = function(owner) {
  const person = get(owner, 'debtor')
  if (person) {
    return nameForPerson({ person })
  }
}

const adaptOwnerLedgerToOwnerName = function(owner) {
  return (
    nameForOrganization(owner) ||
    nameForPerson(owner) ||
    nameForGarnishment(owner)
  )
}

export default adaptOwnerLedgerToOwnerName
