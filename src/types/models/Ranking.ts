import { objectType } from 'nexus'

export const Ranking = objectType({
  name: 'Ranking',
  definition(t) {
    t.model.id()
    t.model.user()
    t.model.prize()
    t.model.period()
    t.model.created_at()
    t.model.updated_at()
  },
})
