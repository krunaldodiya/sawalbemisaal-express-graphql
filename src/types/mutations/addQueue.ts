import { mutationField, nonNull, stringArg } from 'nexus'
import { videoQueue } from '../../queues/videoQueue'

export const addQueue = mutationField('addQueue', {
  type: 'Language',
  args: { languageId: nonNull(stringArg()) },
  resolve: async (parent, { languageId }, { prisma }) => {
    const language = await prisma.language.findFirst({
      where: {
        id: languageId,
      },
    })

    videoQueue.add({ language }, { delay: 1000 })

    return language
  },
})
