import { objectType } from 'nexus'

export const GroupMessage = objectType({
  name: 'GroupMessage',
  definition(t) {
    t.model.id()
    t.model.groupId()
    t.model.senderId()
    t.model.message()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
