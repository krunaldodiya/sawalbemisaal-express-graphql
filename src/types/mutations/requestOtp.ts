import axios from 'axios'
import { mutationField, nonNull, stringArg } from 'nexus'
import { URLSearchParams } from 'url'

const otp = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString()

export const requestOtp = mutationField('requestOtp', {
  type: 'String',
  args: { country_id: nonNull(stringArg()), mobile: nonNull(stringArg()) },
  resolve: async (parent, { country_id, mobile }, { prisma }) => {
    try {
      if (process.env.NODE_ENV !== 'development') {
        const country = await prisma.country.findFirst({
          where: { id: country_id },
        })

        const params = new URLSearchParams({
          authkey: process.env.MSG91_KEY,
          template_id: process.env.MSG91_TEMPLATE_ID,
          mobile: `${country?.phonecode}${mobile}`,
          otp,
          extra_param: JSON.stringify({
            OTP: otp,
            COMPANY_NAME: 'SawalBemisaal',
          }),
        }).toString()

        const url = `https://api.msg91.com/api/v5/otp?${params}`
        const { data } = await axios.get(url)

        if (data.type === 'success') {
          return otp
        } else {
          throw new Error(data.message)
        }
      }

      return otp
    } catch (error) {
      throw new Error(error)
    }
  },
})
