import { arg, intArg, nonNull, queryField } from 'nexus'

export const groupMessages = queryField((t) => {
  t.list.field('groupMessages', {
    type: 'GroupMessage',
    args: {
      group_id: nonNull(intArg()),
      cursor: arg({ type: 'Cursor' }),
      limit: nonNull(intArg()),
    },
    resolve: async (parent, { group_id, cursor, limit }, { prisma, user }) => {
      if (!user) throw new Error('Unauthenticated')

      try {
        return await prisma.groupMessage.findMany({
          cursor: cursor ?? undefined,
          take: limit,
          where: {
            group_id,
          },
        })
      } catch (error) {
        throw new Error(error)
      }
    },
  })
})
