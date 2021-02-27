import axios from 'axios'
import { mutationField, nonNull, stringArg } from 'nexus'
import { URLSearchParams } from 'url'
import { userService } from '../../services/UserService'

export const verifyOtp = mutationField('verifyOtp', {
  type: 'AuthPayload',
  args: {
    countryId: nonNull(stringArg()),
    mobile: nonNull(stringArg()),
    otp: nonNull(stringArg()),
  },
  resolve: async (parent, { countryId, mobile, otp }, { prisma }) => {
    try {
      if (process.env.NODE_ENV !== 'development') {
        const country = await prisma.country.findFirst({
          where: { id: countryId },
        })

        const params = new URLSearchParams({
          authkey: process.env.MSG91_KEY,
          mobile: `${country?.countryCode}${mobile}`,
          otp,
        }).toString()

        const url = `https://api.msg91.com/api/v5/otp/verify?${params}`
        const { data } = await axios.get(url)

        if (data.type === 'success') {
          return userService.createUser({ countryId, mobile })
        } else {
          throw new Error(data.message)
        }
      }

      return userService.createUser({ countryId, mobile })
    } catch (error) {
      throw new Error(error)
    }
  },
})
