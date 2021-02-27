import { enumType } from 'nexus'

export const RankingInput = enumType({
  name: 'RankingInput',
  members: ['Today', 'ThisMonth', 'AllTime'],
})
