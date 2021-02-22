import { objectType } from 'nexus'

export const TvShow = objectType({
  name: 'TvShow',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.image()
    t.model.about()
    t.model.episodes()
    t.model.created_at()
    t.model.updated_at()
  },
})
