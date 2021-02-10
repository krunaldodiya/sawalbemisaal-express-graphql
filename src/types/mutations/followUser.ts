import { mutationField, nonNull, stringArg } from 'nexus'
import { userService } from '../../services/UserService'

export const followUser = mutationField('followUser', {
  type: 'User',
  args: { following_id: nonNull(stringArg()) },
  resolve: async (parent, { following_id }, { user }) => {
    try {
      return userService.followUser({
        user_id: user ? user.id : '',
        guest_id: following_id,
      })
    } catch (error) {
      throw new Error(error)
    }
  },
})
