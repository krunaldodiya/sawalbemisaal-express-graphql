import express from 'express'
import multer from 'multer'
import path from 'path'

export const homeRoutes = express.Router()

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: async (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

homeRoutes.get('/api/status', async (req, res) => {
  res.json({ status: 'okay' })
})

homeRoutes.get('/', async (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

homeRoutes.get('/upload', async (req, res) => {
  res.render('upload', { title: 'Hey', message: 'Hello there!' })
})

homeRoutes.post('/upload', upload.single('avatar'), async (req, res) => {
  res.json({ status: 'ok' })
})
