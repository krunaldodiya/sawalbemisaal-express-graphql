import { nonNull, queryField, stringArg } from 'nexus'
import { userService } from '../../services/UserService'

export const checkFollowStatus = queryField('checkFollowStatus', {
  type: 'FollowStatus',
  args: { guestId: nonNull(stringArg()) },
  resolve: async (parent, { guestId }, { user }) => {
    try {
      return userService.checkFollowStatus(guestId, user ? user.id : '')
    } catch (error) {
      throw new Error(error)
    }
  },
})
