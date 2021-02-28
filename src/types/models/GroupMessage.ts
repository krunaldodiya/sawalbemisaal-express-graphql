import { objectType } from 'nexus'

export const GroupMessage = objectType({
  name: 'GroupMessage',
  definition(t) {
    t.model.id()
    t.model.group_id()
    t.model.sender_id()
    t.model.message()
    t.model.created_at()
    t.model.updated_at()
  },
})
