import { withFilter } from 'graphql-subscriptions'
import { subscriptionField } from 'nexus'

export const onMessageAdded = subscriptionField('onMessageAdded', {
  type: 'Message',

  subscribe: withFilter(
    (parent, args, { pubsub }) => {
      return pubsub.asyncIterator('MESSAGE_ADDED')
    },
    ({ payload }, args, { user }) => {
      const { sender_id, receiver_id } = payload

      if (!user) return false

      return [sender_id, receiver_id].includes(user.id)
    },
  ),
  resolve: ({ payload }, args, ctx) => {
    return payload
  },
})
