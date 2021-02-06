import { withFilter } from 'graphql-subscriptions'
import { subscriptionField } from 'nexus'

export const onMessageAdded = subscriptionField('onMessageAdded', {
  type: 'Message',
  subscribe: withFilter(
    (parent, args, { pubsub }) => {
      return pubsub.subscribe('MESSAGE_ADDED')
    },
    ({ sender_id, receiver_id }, variables, { user }) => {
      if (!user) return false

      return [sender_id, receiver_id].includes(user.id)
    },
  ),
  resolve: (payload: any) => {
    return payload
  },
})
