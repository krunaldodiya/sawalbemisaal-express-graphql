import { objectType } from 'nexus'

export const Ranking = objectType({
  name: 'Ranking',
  definition(t) {
    t.model.id()
    t.model.user()
    t.model.prize()
    t.model.period()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
