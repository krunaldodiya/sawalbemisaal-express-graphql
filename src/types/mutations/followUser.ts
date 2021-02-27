import { mutationField, nonNull, stringArg } from 'nexus'
import { userService } from '../../services/UserService'

export const followUser = mutationField('followUser', {
  type: 'User',
  args: { followingId: nonNull(stringArg()) },
  resolve: async (parent, { followingId }, { user }) => {
    try {
      return userService.followUser({
        userId: user ? user.id : '',
        guestId: followingId,
      })
    } catch (error) {
      throw new Error(error)
    }
  },
})
