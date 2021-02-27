import { objectType } from 'nexus'
import { userService } from '../../services/UserService'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.countryId()
    t.model.country()
    t.model.wallet()
    t.model.following()
    t.model.followers()
    t.model.mobile()
    t.model.name()
    t.model.username()
    t.model.email()
    t.model.dob()
    t.model.gender()
    t.model.avatar()
    t.model.instagramUsername()
    t.model.bio()
    t.model.admin()
    t.model.influencer()
    t.model.demo()
    t.model.status()
    t.model.fcmToken()
    t.model.version()
    t.model.referralCode()

    t.field('follow_status', {
      type: 'FollowStatus',
      resolve: async (root, args, { user }) => {
        if (user) {
          return userService.checkFollowStatus(root.id, user.id)
        }

        return { is_follower: false, is_following: false }
      },
    })

    t.model.createdAt()
    t.model.updatedAt()
  },
})
