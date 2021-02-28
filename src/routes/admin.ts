import express from 'express'

export const adminRoutes = express.Router()

adminRoutes.get('/admin', async (req, res) => {
  res.json({ status: 'okay' })
})

adminRoutes.get('/dashboard', async (req, res) => {
  res.json({ status: 'dashboard' })
})
