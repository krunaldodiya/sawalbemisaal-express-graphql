import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { execute, subscribe } from 'graphql'
import { createServer } from 'http'
import path from 'path'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { createContext } from './context'
import { homeRoutes } from './routes/home'
import { schemaWithMiddleware } from './schema'

const PORT = process.env.PORT ?? 4000

const app = express()

const server = createServer(app)

app.set('view engine', 'pug')

app.set('views', path.join(__dirname, 'views'))

app.use(homeRoutes)

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP(async (request, response) => {
    const context = await createContext(request, response)

    return {
      schema: schemaWithMiddleware,
      context,
      graphiql: true,
    }
  }),
)

server.listen(PORT, () => {
  return new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: schemaWithMiddleware,
    },
    {
      server,
      path: '/subscriptions',
    },
  )
})

console.log(`Server ready at: http://localhost:${PORT}/graphql`)
