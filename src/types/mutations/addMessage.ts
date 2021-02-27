import { mutationField, nonNull, stringArg } from 'nexus'

export const addMessage = mutationField('addMessage', {
  type: 'Message',
  args: { buddyId: nonNull(stringArg()), message: nonNull(stringArg()) },
  resolve: async (parent, { buddyId, message }, { prisma, user, pubsub }) => {
    const newMessage = await prisma.message.create({
      data: {
        receiverId: buddyId,
        senderId: user ? user.id : '',
        message,
      },
    })

    pubsub.publish('MESSAGE_ADDED', {
      payload: newMessage,
    })

    return newMessage
  },
})
