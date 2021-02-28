import { arg, mutationField, nonNull, stringArg } from 'nexus'

export const editProfile = mutationField('editProfile', {
  type: 'User',
  args: {
    name: nonNull(stringArg()),
    email: nonNull(stringArg()),
    username: nonNull(stringArg()),
    gender: nonNull(arg({ type: 'Gender' })),
    dob: nonNull(stringArg()),
  },
  resolve: async (
    parent,
    { name, email, username, gender, dob },
    { prisma, user },
  ) => {
    if (!user) throw new Error('Unauthenticated')

    try {
      return await prisma.user.update({
        where: { id: user.id },
        data: { name, email, username, gender, dob, status: true },
      })
    } catch (error) {
      throw new Error(error)
    }
  },
})
