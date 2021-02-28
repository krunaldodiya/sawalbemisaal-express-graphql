import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { execute, subscribe } from 'graphql'
import expressPlayground from 'graphql-playground-middleware-express'
import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { createContext, prisma, pubsub } from './context'
import { config } from './libs/config'
import { getUserFromToken } from './libs/getUserFromToken'
import { adminRoutes } from './routes/admin'
import { homeRoutes } from './routes/home'
import { schemaWithMiddleware } from './schema'

const PORT = process.env.PORT ?? 4000

const app = express()

const server = createServer(app)

app.set('view engine', 'pug')

app.set('views', config('views'))

app.use(homeRoutes)
app.use(adminRoutes)

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

app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

server.listen(PORT, () => {
  return new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: schemaWithMiddleware,
      onConnect: async (connectionParams: any) => {
        const token = connectionParams.headers['authorization']?.slice(7)
        const user = await getUserFromToken(token, prisma)

        return { user, pubsub, prisma }
      },
    },
    {
      server,
      path: '/subscriptions',
    },
  )
})

console.log(`Server ready at: http://localhost:${PORT}/graphql`)
