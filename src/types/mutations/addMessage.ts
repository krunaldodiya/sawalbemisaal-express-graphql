import { intArg, mutationField, nonNull, stringArg } from 'nexus'

export const addMessage = mutationField('addMessage', {
  type: 'Message',
  args: { receiver_id: nonNull(intArg()), message: nonNull(stringArg()) },
  resolve: async (
    parent,
    { receiver_id, message },
    { prisma, user, pubsub },
  ) => {
    if (!user) throw new Error('Unauthenticated')

    const newMessage = await prisma.message.create({
      data: {
        receiver_id,
        sender_id: user.id,
        message,
      },
    })

    pubsub.publish('MESSAGE_ADDED', {
      payload: newMessage,
    })

    return newMessage
  },
})
