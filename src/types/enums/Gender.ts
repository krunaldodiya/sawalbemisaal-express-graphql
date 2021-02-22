import { enumType } from 'nexus'

export const Gender = enumType({
  name: 'Gender',
  members: ['None', 'Male', 'Female'],
})
