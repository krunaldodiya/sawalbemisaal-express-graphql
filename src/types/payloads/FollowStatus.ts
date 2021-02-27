import { objectType } from 'nexus'

export const FollowStatus = objectType({
  name: 'FollowStatus',
  definition(t) {
    t.boolean('isFollowing')
    t.boolean('isFollower')
  },
})
