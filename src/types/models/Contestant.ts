import { objectType } from 'nexus'
import { ContestantStatus } from '../enums/ContestantStatus'

export const Contestant = objectType({
  name: 'Contestant',
  definition(t) {
    t.model.id()
    t.model.image()
    t.model.name()
    t.model.polls()
    t.field('status', { type: ContestantStatus })
    t.model.tv_show()
    t.model.tv_show_id()
    t.model.created_at()
    t.model.updated_at()
  },
})
