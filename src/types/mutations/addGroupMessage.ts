import { intArg, mutationField, nonNull, stringArg } from 'nexus'

export const addGroupMessage = mutationField('addGroupMessage', {
  type: 'GroupMessage',
  args: {
    group_id: nonNull(intArg()),
    message: nonNull(stringArg()),
  },
  resolve: async (parent, { group_id, message }, { prisma, user, pubsub }) => {
    if (!user) throw new Error('Unauthenticated')

    const newMessage = await prisma.groupMessage.create({
      data: {
        group_id,
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
