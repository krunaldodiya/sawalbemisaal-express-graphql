import { queryField } from 'nexus'

export const countries = queryField((t) => {
  t.list.field('countries', {
    type: 'Country',
    resolve: async (parent, args, { prisma }) => {
      try {
        return await prisma.country.findMany()
      } catch (error) {
        throw new Error(error)
      }
    },
  })
})
