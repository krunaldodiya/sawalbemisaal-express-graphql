import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { execute, subscribe } from 'graphql'
import { createServer } from 'http'
import path from 'path'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { createContext } from './context'
import { schema } from './schema'
import multer from 'multer'

const PORT = process.env.PORT ?? 4000

const app = express()

const router = express.Router()

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: async (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.set('view engine', 'pug')

app.set('views', path.join(__dirname, 'views'))

app.use(router)

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    context: createContext(),
    graphiql: true,
  }),
)

const ws = createServer(app)

ws.listen(PORT, () => {
  return new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: ws,
      path: '/subscriptions',
    },
  )
})

router.get('/', async (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

router.get('/upload', async (req, res) => {
  res.render('upload', { title: 'Hey', message: 'Hello there!' })
})

router.post('/upload', upload.single('avatar'), async (req, res) => {
  console.log(req.file)
  res.json({ status: 'ok' })
})

console.log(`Server ready at: http://localhost:${PORT}/graphql`)
