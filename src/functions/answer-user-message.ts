import { generateText } from 'ai'
import { gemini } from '../ai/google'
import { postgresTool } from '../ai/tools/postgress-tool'
import { redisTool } from '../ai/tools/redis-tool'

interface AnswerUserMessageParams {
  message: string
}

export async function answerUserMessage({ message }: AnswerUserMessageParams) {
  const answer = await generateText({
    model: gemini,
    prompt: message,
    tools: {
      postgresTool,
      redisTool,
    },
    system: `
      Você é um assistente de IA responsável por responder dúvidas sobre um evento de programação.

      Inclua na resposta somente o que o usuário pediu, sem nenhum texto adicional.

      O retorno deve ser sempre em markdown (sem incluir \`\`\` no início ou no fim).

      Cada tool deve ser usada de forma sequencial, ou seja, nao tente incluir uma tool diretamente dentro de outra, apenas os seus resultados devem ser aproveitados.
    `.trim(),
    maxSteps: 5,
  })

  return { response: answer.text }
}
