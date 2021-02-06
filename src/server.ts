import express, { Router } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { execute, subscribe } from 'graphql'
import { createServer } from 'http'
import path from 'path'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { createContext } from './context'
import { schemaWithMiddleware } from './schema'

const PORT = process.env.PORT ?? 4000

const app = express()

const server = createServer(app)

const router = Router()

app.use(router)

app.set('view engine', 'pug')

app.set('views', path.join(__dirname, 'views'))

app.use(
  '/graphql',
  graphqlHTTP(async (request) => {
    const context = await createContext(request)

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
