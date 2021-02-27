import { withFilter } from 'graphql-subscriptions'
import { subscriptionField } from 'nexus'

export const onMessageAdded = subscriptionField('onMessageAdded', {
  type: 'Message',

  subscribe: withFilter(
    (parent, args, { pubsub }) => {
      return pubsub.asyncIterator('MESSAGE_ADDED')
    },
    ({ payload }, args, { user }) => {
      const { senderId, receiverId } = payload

      if (!user) return false

      return [senderId, receiverId].includes(user.id)
    },
  ),
  resolve: ({ payload }, args, ctx) => {
    return payload
  },
})
