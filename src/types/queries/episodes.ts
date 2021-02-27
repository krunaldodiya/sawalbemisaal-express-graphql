import { nonNull, queryField, stringArg } from 'nexus'

export const episodes = queryField((t) => {
  t.list.field('episodes', {
    type: 'Episode',
    args: { tvShowId: nonNull(stringArg()) },
    resolve: async (parent, args, { prisma }) => {
      try {
        return await prisma.episode.findMany()
      } catch (error) {
        throw new Error(error)
      }
    },
  })
})
