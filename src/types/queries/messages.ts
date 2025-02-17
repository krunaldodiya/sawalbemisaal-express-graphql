import { arg, intArg, nonNull, queryField } from 'nexus'

export const messages = queryField((t) => {
  t.list.field('messages', {
    type: 'Message',
    args: {
      buddy_id: nonNull(intArg()),
      cursor: arg({ type: 'Cursor' }),
      limit: nonNull(intArg()),
    },
    resolve: async (parent, { buddy_id, cursor, limit }, { prisma, user }) => {
      if (!user) throw new Error('Unauthenticated')

      try {
        return await prisma.message.findMany({
          cursor: cursor ?? undefined,
          take: limit,
          where: {
            OR: [
              { sender_id: user.id, receiver_id: buddy_id },
              { sender_id: buddy_id, receiver_id: user.id },
            ],
          },
        })
      } catch (error) {
        throw new Error(error)
      }
    },
  })
})
