import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { subscribeToEventRoute } from './routes/subscribe-to-event'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks'
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites.count'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position'
import { getRankingRoute } from './routes/get-ranking'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: true,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'stagedev | NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInvitesCountRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running')
})
