import { intArg, mutationField, nonNull } from 'nexus'
import { videoQueue } from '../../queues/videoQueue'

export const addQueue = mutationField('addQueue', {
  type: 'Language',
  args: { language_id: nonNull(intArg()) },
  resolve: async (parent, { language_id }, { prisma }) => {
    const language = await prisma.language.findFirst({
      where: {
        id: language_id,
      },
    })

    videoQueue.add({ language }, { delay: 1000 })

    return language
  },
})
