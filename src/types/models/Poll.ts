import { objectType } from 'nexus'
import { PollStatus } from '../enums/PollStatus'

export const Poll = objectType({
  name: 'Poll',
  definition(t) {
    t.model.id()
    t.model.answer()
    t.model.question()
    t.field('status', { type: PollStatus })
    t.model.contestants()
    t.model.created_at()
    t.model.updated_at()
  },
})
