import axios from 'axios'
import express from 'express'
import { prisma } from '../context'

export const adminRoutes = express.Router()

adminRoutes.get('/admin/countries', async (req, res) => {
  const { data } = await axios('https://api.sawalbemisaal.com/api/countries')

  const countries = data.countries.map((country, index) => {
    return {
      id: index + 1,
      name: country.name,
      short_name: country.shortname,
      country_code: country.phonecode,
    }
  })

  try {
    await prisma.$transaction(
      countries.map((country) => {
        return prisma.country.create({ data: country })
      }),
    )
  } catch (error) {
    console.log(error)
  }

  res.json({ countries })
})

adminRoutes.get('/admin/languages', async (req, res) => {
  const { data } = await axios('https://api.sawalbemisaal.com/api/languages')

  const languages = data.languages.map((language, index) => {
    return {
      id: index + 1,
      name: language.name,
      nickname: language.nickname,
    }
  })

  try {
    await prisma.$transaction(
      languages.map((language) => {
        return prisma.language.create({ data: language })
      }),
    )
  } catch (error) {
    console.log(error)
  }

  res.json({ languages })
})
