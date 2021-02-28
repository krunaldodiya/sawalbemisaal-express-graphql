import { intArg, nonNull, queryField } from 'nexus'
import { userService } from '../../services/UserService'

export const checkFollowStatus = queryField('checkFollowStatus', {
  type: 'FollowStatus',
  args: { guest_id: nonNull(intArg()) },
  resolve: async (parent, { guest_id }, { user }) => {
    try {
      if (user) {
        return userService.checkFollowStatus(guest_id, user.id)
      }

      return { is_follower: false, is_following: false }
    } catch (error) {
      throw new Error(error)
    }
  },
})
