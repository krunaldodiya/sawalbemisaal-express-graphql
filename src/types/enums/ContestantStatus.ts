import { enumType } from 'nexus'

export const ContestantStatus = enumType({
  name: 'ContestantStatus',
  members: ['Deposit', 'Withdraw'],
})
