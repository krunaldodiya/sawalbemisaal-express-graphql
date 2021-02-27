import { Gender, TransactionStatus, TransactionType } from '@prisma/client'
import { RankingInput } from './enums/RankingInput'
import { Cursor } from './inputs/Cursor'
import { Country } from './models/Country'
import { Episode } from './models/Episode'
import { GroupMessage } from './models/GroupMessage'
import { Language } from './models/Language'
import { Message } from './models/Message'
import { Ranking } from './models/Ranking'
import { TransactionMeta } from './models/TransactionMeta'
import { TvShow } from './models/TvShow'
import { User } from './models/User'
import { Wallet } from './models/Wallet'
import { WalletTransaction } from './models/WalletTransaction'
import { addMessage } from './mutations/addMessage'
import { addQueue } from './mutations/addQueue'
import { editProfile } from './mutations/editProfile'
import { followUser } from './mutations/followUser'
import { requestOtp } from './mutations/requestOtp'
import { verifyOtp } from './mutations/verifyOtp'
import { AuthPayload } from './payloads/AuthPayload'
import { FollowStatus } from './payloads/FollowStatus'
import { checkFollowStatus } from './queries/checkFollowStatus'
import { countries } from './queries/countries'
import { episodes } from './queries/episodes'
import { findUserById } from './queries/findUserById'
import { getRankings } from './queries/getRankings'
import { languages } from './queries/languages'
import { me } from './queries/me'
import { messages } from './queries/messages'
import { searchUsers } from './queries/searchUsers'
import { tvShows } from './queries/tvShows'
import { onMessageAdded } from './subscriptions/onMessageAdded'

export default [
  AuthPayload,
  Cursor,
  TransactionType,
  TransactionStatus,
  Gender,
  RankingInput,
  TransactionMeta,
  Message,
  GroupMessage,
  User,
  Country,
  TvShow,
  Episode,
  Language,
  Wallet,
  WalletTransaction,
  me,
  findUserById,
  languages,
  countries,
  addQueue,
  requestOtp,
  verifyOtp,
  onMessageAdded,
  followUser,
  checkFollowStatus,
  FollowStatus,
  editProfile,
  addMessage,
  messages,
  searchUsers,
  Ranking,
  getRankings,
  tvShows,
  episodes,
]
