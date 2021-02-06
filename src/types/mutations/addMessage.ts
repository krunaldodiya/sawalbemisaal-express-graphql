import { mutationField, nonNull, stringArg } from 'nexus'

export const addMessage = mutationField('addMessage', {
  type: 'Message',
  args: { buddy_id: nonNull(stringArg()), message: nonNull(stringArg()) },
  resolve: async (parent, { buddy_id, message }, { prisma, user, pubsub }) => {
    const newMessage = await prisma.message.create({
      data: {
        receiver_id: buddy_id,
        sender_id: user ? user.id : '',
        message,
      },
    })

    pubsub.publish('MESSAGE_ADDED', {
      payload: newMessage,
    })

    return newMessage
  },
})
