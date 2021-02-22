import { objectType } from 'nexus'

export const Episode = objectType({
  name: 'Episode',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.image()
    t.model.tv_show()
    t.model.air_date()
    t.model.created_at()
    t.model.updated_at()
  },
})
