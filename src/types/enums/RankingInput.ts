import { enumType } from 'nexus'

export const RankingInput = enumType({
  name: 'RankingInput',
  members: ['Today', 'This_Month', 'All_Time'],
})
