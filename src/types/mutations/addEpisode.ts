import { mutationField, nonNull, nullable, stringArg } from 'nexus'
import dayjs from 'dayjs'

export const addEpisode = mutationField('addEpisode', {
  type: 'Episode',
  args: {
    tv_show_id: nonNull(stringArg()),
    name: nonNull(stringArg()),
    image: nullable(stringArg()),
    air_date: nullable(stringArg()),
  },
  resolve: async (
    parent,
    { tv_show_id, name, image, air_date },
    { prisma, user, pubsub },
  ) => {
    const air_date_formatted = dayjs(air_date).toISOString()

    try {
      return await prisma.episode.create({
        data: {
          tv_show_id,
          name,
          image: image ?? '',
          air_date: air_date_formatted ?? '',
        },
      })
    } catch (error) {
      console.log(error)
    }
  },
})
