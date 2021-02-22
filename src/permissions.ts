import { rule, shield } from 'graphql-shield'

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, { user }, info) => {
    return user !== null
  },
)
export const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, { user }, info) => {
    return user !== null && user.admin
  },
)

export const permissions = shield({
  Query: {
    me: isAuthenticated,
    checkFollowStatus: isAuthenticated,
    findUserById: isAuthenticated,
    messages: isAuthenticated,
    searchUsers: isAuthenticated,
    getRankings: isAuthenticated,
  },
  Mutation: {
    addQueue: isAuthenticated,
    addMessage: isAuthenticated,
    followUser: isAuthenticated,
    editProfile: isAuthenticated,
    addTvShow: isAdmin,
    addEpisode: isAdmin,
  },
  Subscription: {
    onMessageAdded: isAuthenticated,
  },
})
