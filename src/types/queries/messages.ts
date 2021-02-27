import { arg, intArg, nonNull, queryField, stringArg } from 'nexus'

export const messages = queryField((t) => {
  t.list.field('messages', {
    type: 'Message',
    args: {
      buddyId: nonNull(stringArg()),
      cursor: arg({ type: 'Cursor' }),
      limit: nonNull(intArg()),
    },
    resolve: async (parent, { buddyId, cursor, limit }, { prisma, user }) => {
      try {
        return await prisma.message.findMany({
          cursor: cursor ?? undefined,
          take: limit,
          where: {
            OR: [
              { senderId: user ? user.id : '', receiverId: buddyId },
              { senderId: buddyId, receiverId: user ? user.id : '' },
            ],
          },
        })
      } catch (error) {
        throw new Error(error)
      }
    },
  })
})
