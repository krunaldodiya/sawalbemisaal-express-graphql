import { Gender, TransactionStatus, TransactionType } from '@prisma/client'
import { Country } from './models/Country'
import { Language } from './models/Language'
import { Message } from './models/Message'
import { TransactionMeta } from './models/TransactionMeta'
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
import { findUserById } from './queries/findUserById'
import { countries } from './queries/countries'
import { languages } from './queries/languages'
import { messages } from './queries/messages'
import { me } from './queries/me'
import { onMessageAdded } from './subscriptions/onMessageAdded'
import { searchUsers } from './queries/searchUsers'
import { Cursor } from './inputs/Cursor'
import { Ranking } from './models/Ranking'
import { getRankings } from './queries/getRankings'
import { RankingInput } from './enums/RankingInput'
import { TvShow } from './models/TvShow'
import { addTvShow } from './mutations/addTvShow'
import { Episode } from './models/Episode'
import { addEpisode } from './mutations/addEpisode'
import { tvShows } from './queries/tvShows'
import { episodes } from './queries/episodes'

export default [
  AuthPayload,
  Cursor,
  TransactionType,
  TransactionStatus,
  Gender,
  RankingInput,
  TransactionMeta,
  Message,
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
  addTvShow,
  addEpisode,
  tvShows,
  episodes,
]
