import { objectType } from 'nexus'

export const Episode = objectType({
  name: 'Episode',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.image()
    t.model.tvShow()
    t.model.airDate()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
