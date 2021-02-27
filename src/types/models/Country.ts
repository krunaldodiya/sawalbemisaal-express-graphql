import { objectType } from 'nexus'

export const Country = objectType({
  name: 'Country',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.shortName()
    t.model.countryCode()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
