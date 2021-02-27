import { mutationField, nonNull, stringArg } from 'nexus'

export const addGroupMessage = mutationField('addGroupMessage', {
  type: 'GroupMessage',
  args: {
    groupId: nonNull(stringArg()),
    senderId: nonNull(stringArg()),
    message: nonNull(stringArg()),
  },
  resolve: async (
    parent,
    { groupId, senderId, message },
    { prisma, user, pubsub },
  ) => {
    const newMessage = await prisma.groupMessage.create({
      data: {
        groupId,
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
