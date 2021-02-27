import { objectType } from 'nexus'

export const Language = objectType({
  name: 'Language',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.nickname()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
