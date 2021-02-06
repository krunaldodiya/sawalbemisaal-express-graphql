import { queryField } from 'nexus'

export const languages = queryField((t) =>
  t.list.field('languages', {
    type: 'Language',
    resolve: async (parent, args, { prisma }) => {
      try {
        return await prisma.language.findMany()
      } catch (error) {
        throw new Error(error)
      }
    },
  }),
)
