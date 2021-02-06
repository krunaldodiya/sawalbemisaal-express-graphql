import { PrismaClient, User } from '@prisma/client'
import { Request } from 'express'
import jwt from 'jsonwebtoken'

export const getUserFromToken = async (
  request: Request,
  prisma: PrismaClient,
): Promise<User | null> => {
  const token = request.headers['authorization']

  if (!token) {
    return null
  }

  try {
    const payload: any = jwt.verify(token, process.env.JWT_TOKEN ?? 'secret')

    return prisma.user.findFirst({
      rejectOnNotFound: true,
      where: { id: payload.id },
    })
  } catch (error) {
    return null
  }
}
