import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  WEB_URL: z.string().url(),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
