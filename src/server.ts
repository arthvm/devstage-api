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
import { subscribeToEvent } from './routes/subscribe-to-event'
import { env } from './env'

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

app.register(subscribeToEvent)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running')
})
