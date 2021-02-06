import { PrismaClient, User } from '@prisma/client'
import jwt from 'jsonwebtoken'

export const getUserFromToken = async (
  token: string | undefined,
  prisma: PrismaClient,
): Promise<User | null> => {
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
