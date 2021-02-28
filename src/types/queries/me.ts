import { queryField } from 'nexus'
import { userService } from '../../services/UserService'

export const me = queryField('me', {
  type: 'User',
  resolve: (parent, args, { prisma, user }) => {
    if (user) {
      return userService.findUserById(user.id)
    }

    return null
  },
})
