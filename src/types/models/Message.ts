import { objectType } from 'nexus'

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.model.id()
    t.model.senderId()
    t.model.receiverId()
    t.model.message()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
