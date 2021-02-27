import { nonNull, queryField, stringArg } from 'nexus'
import { userService } from '../../services/UserService'

export const findUserById = queryField('findUserById', {
  type: 'User',
  args: { userId: nonNull(stringArg()) },
  resolve: async (parent, { userId }) => {
    return userService.findUserById(userId)
  },
})
