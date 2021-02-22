import { mutationField, nonNull, nullable, stringArg } from 'nexus'

export const addTvShow = mutationField('addTvShow', {
  type: 'TvShow',
  args: {
    name: nonNull(stringArg()),
    image: nullable(stringArg()),
    about: nullable(stringArg()),
  },
  resolve: async (parent, { name, image, about }, { prisma, user, pubsub }) => {
    return await prisma.tvShow.create({
      data: {
        name,
        image: image ?? '',
        about: about ?? '',
      },
    })
  },
})
