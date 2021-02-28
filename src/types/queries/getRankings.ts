import { arg, nonNull, queryField } from 'nexus'

export const getRankings = queryField((t) => {
  t.list.field('getRankings', {
    type: 'Ranking',
    args: { period: nonNull(arg({ type: 'RankingInput' })) },
    resolve: async (parent, { period }, { prisma, user }) => {
      try {
        return await prisma.ranking.findMany()
      } catch (error) {
        throw new Error(error)
      }
    },
  })
})
