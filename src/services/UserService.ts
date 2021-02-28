import { User } from '@prisma/client'
import { prisma } from '../context'
import { generatePin } from '../libs/generatePin'
import { followAdmin } from '../queues/followAdmin'
import jwt from 'jsonwebtoken'

export class UserService {
  async createUser({
    mobile,
    country_id,
  }: {
    mobile: string
    country_id: number
  }) {
    const user = await prisma.user.findFirst({ where: { mobile } })

    if (user) {
      return this.authenticate(user)
    }

    try {
      const newUser = await prisma.user.create({
        data: {
          mobile,
          country_id,
          referral_code: generatePin(),
        },
      })

      await prisma.wallet.create({
        data: {
          balance: 10,
          user_id: newUser.id,
          wallet_transactions: {
            create: {
              user_id: newUser.id,
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

      followAdmin.add({ user_id: newUser.id })

      return this.authenticate(newUser)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findUserById(user_id: number) {
    return await prisma.user.findFirst({
      where: { id: user_id },
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

  async checkFollowStatus(guest_id: number, user_id: number) {
    const guest = await prisma.user.findFirst({
      rejectOnNotFound: true,
      where: {
        id: guest_id,
      },
      include: {
        followers: {
          where: { id: user_id },
        },
        following: {
          where: { id: user_id },
        },
      },
    })

    return {
      is_follower: guest.following.length ? true : false,
      is_following: guest.followers.length ? true : false,
    }
  }

  async followUser({
    user_id,
    guest_id,
  }: {
    user_id: number
    guest_id: number
  }) {
    const { is_following } = await this.checkFollowStatus(guest_id, user_id)

    await prisma.user.update({
      where: { id: user_id },
      data: {
        following: is_following
          ? { disconnect: { id: guest_id } }
          : { connect: { id: guest_id } },
      },
    })

    return await prisma.user.findFirst({
      rejectOnNotFound: true,
      where: { id: guest_id },
    })
  }
}

export const userService = new UserService()
