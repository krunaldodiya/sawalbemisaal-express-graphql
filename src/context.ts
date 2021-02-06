import { PrismaClient } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'

export const prisma = new PrismaClient()
export const pubsub = new PubSub()

export interface Context {
  prisma: PrismaClient
  pubsub: PubSub
}

export function createContext(): Context {
  return { prisma, pubsub }
}
