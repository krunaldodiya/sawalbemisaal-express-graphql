import { objectType } from 'nexus'

export const Country = objectType({
  name: 'Country',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.short_name()
    t.model.country_code()
    t.model.created_at()
    t.model.updated_at()
  },
})
