import { queryField } from 'nexus'

export const tvShows = queryField((t) => {
  t.list.field('tvShows', {
    type: 'TvShow',
    resolve: async (parent, args, { prisma }) => {
      try {
        return await prisma.tvShow.findMany()
      } catch (error) {
        throw new Error(error)
      }
    },
  })
})
