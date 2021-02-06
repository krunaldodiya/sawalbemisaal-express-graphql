import multer from 'multer'
import path from 'path'
import { router } from './server'

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: async (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

router.get('/', async (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

router.get('/upload', async (req, res) => {
  res.render('upload', { title: 'Hey', message: 'Hello there!' })
})

router.post('/upload', upload.single('avatar'), async (req, res) => {
  res.json({ status: 'ok' })
})
