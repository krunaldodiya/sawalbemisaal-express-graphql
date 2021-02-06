import { PrismaClient, User } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'
import { getUserFromToken } from './libs/getUserFromToken'

export const prisma = new PrismaClient()
export const pubsub = new PubSub()

export interface Context {
  prisma: PrismaClient
  pubsub: PubSub
  user: User | null
}

export async function createContext(request: any): Promise<Context> {
  const user = await getUserFromToken(request, prisma)

  return { prisma, pubsub, user }
}
