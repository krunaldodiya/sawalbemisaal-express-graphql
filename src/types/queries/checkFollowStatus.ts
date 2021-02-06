import { nonNull, queryField, stringArg } from 'nexus'
import { userService } from '../../services/UserService'

export const checkFollowStatus = queryField('checkFollowStatus', {
  type: 'FollowStatus',
  args: { guest_id: nonNull(stringArg()) },
  resolve: async (parent, { guest_id }, { user }) => {
    try {
      return userService.checkFollowStatus(guest_id, user.id)
    } catch (error) {
      throw new Error(error)
    }
  },
})
