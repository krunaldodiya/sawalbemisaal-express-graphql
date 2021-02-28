import { intArg, nonNull, queryField } from 'nexus'

export const episodes = queryField((t) => {
  t.list.field('episodes', {
    type: 'Episode',
    args: { tv_show_id: nonNull(intArg()) },
    resolve: async (parent, { tv_show_id }, { prisma }) => {
      try {
        return await prisma.episode.findMany({
          where: { tv_show_id },
        })
      } catch (error) {
        throw new Error(error)
      }
    },
  })
})
