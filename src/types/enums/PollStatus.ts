import { enumType } from 'nexus'

export const PollStatus = enumType({
  name: 'PollStatus',
  members: ['Deposit', 'Withdraw'],
})
