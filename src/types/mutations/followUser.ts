import { intArg, mutationField, nonNull } from 'nexus'
import { userService } from '../../services/UserService'

export const followUser = mutationField('followUser', {
  type: 'User',
  args: { following_id: nonNull(intArg()) },
  resolve: async (parent, { following_id }, { user }) => {
    if (!user) throw new Error('Unauthenticated')

    try {
      return userService.followUser({
        user_id: user.id,
        guest_id: following_id,
      })
    } catch (error) {
      throw new Error(error)
    }
  },
})
