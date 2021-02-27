import { User } from '@prisma/client'
import { prisma } from '../context'
import { generatePin } from '../libs/generatePin'
import { followAdmin } from '../queues/followAdmin'
import jwt from 'jsonwebtoken'

export class UserService {
  async createUser({
    mobile,
    countryId,
  }: {
    mobile: string
    countryId: string
  }) {
    const user = await prisma.user.findFirst({ where: { mobile } })

    if (user) {
      return this.authenticate(user)
    }

    try {
      const newUser = await prisma.user.create({
        data: {
          mobile,
          countryId,
          referralCode: generatePin(),
        },
      })

      await prisma.wallet.create({
        data: {
          balance: 10,
          userId: newUser.id,
          walletTransactions: {
            create: {
              userId: newUser.id,
              amount: 10,
              type: 'Deposit',
              status: 'Success',
              meta: {
                title: 'joining_bonus',
                description: 'welcome to our app',
              },
            },
          },
        },
      })

      followAdmin.add({ userId: newUser.id })

      return this.authenticate(newUser)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findUserById(userId: string) {
    return await prisma.user.findFirst({
      where: { id: userId },
      rejectOnNotFound: true,
    })
  }

  async authenticate(user: User) {
    const token: string = jwt.sign(
      { id: user.id },
      process.env.JWT_TOKEN ?? 'secret',
    )

    return { token, user }
  }

  async checkFollowStatus(guestId: string, userId: string) {
    const guest = await prisma.user.findFirst({
      rejectOnNotFound: true,
      where: {
        id: guestId,
      },
      include: {
        followers: {
          where: { id: userId },
        },
        following: {
          where: { id: userId },
        },
      },
    })

    return {
      isFollower: guest.following.length ? true : false,
      isFollowing: guest.followers.length ? true : false,
    }
  }

  async followUser({ userId, guestId }: { userId: string; guestId: string }) {
    const { isFollowing } = await this.checkFollowStatus(guestId, userId)

    await prisma.user.update({
      where: { id: userId },
      data: {
        following: isFollowing
          ? { disconnect: { id: guestId } }
          : { connect: { id: guestId } },
      },
    })

    return await prisma.user.findFirst({
      rejectOnNotFound: true,
      where: { id: guestId },
    })
  }
}

export const userService = new UserService()
