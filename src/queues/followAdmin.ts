import Queue from 'bull'
import { prisma } from '../context'
import { config } from '../libs/config'
import { userService } from '../services/UserService'

export const followAdmin = new Queue('Follow Admin', config('redis'))

followAdmin.process(async (job, done) => {
  const { userId } = job.data

  try {
    const admin = await prisma.user.findFirst({
      where: { email: 'admin@sawalbemisaal.com' },
      rejectOnNotFound: true,
    })

    userService.followUser({ userId, guestId: admin.id })
  } catch (error) {
    throw new Error(error)
  }

  done()
})
