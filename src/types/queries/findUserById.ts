import { intArg, nonNull, queryField } from 'nexus'
import { userService } from '../../services/UserService'

export const findUserById = queryField('findUserById', {
  type: 'User',
  args: { user_id: nonNull(intArg()) },
  resolve: async (parent, { user_id }) => {
    return userService.findUserById(user_id)
  },
})
