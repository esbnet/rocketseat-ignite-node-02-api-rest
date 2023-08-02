import crypto from "crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { checkSessionIdExists } from "../middleware/check-session-id-exist";

export async function transactionsRoutes(app: FastifyInstance) {

  // Add transaction
  app.post('/',async (request, reply) => {
    
    const createTransactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionSchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = crypto.randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      })
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title, 
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId
    })
    return reply.status(201).send()
  })

  // List all transactions
  app.get('/',{ preHandler: [checkSessionIdExists]}, async (request, reply) => {  
    
    const { sessionId } = request.cookies

    const transactions = await knex('transactions')
      .where('session_id', sessionId)
      .select()  
      
    return { transactions }
  })

  // Find transaction by id
  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (request) => {
      const getTransactionSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionSchema.parse(request.params)

      const { sessionId } = request.cookies

      const transaction = await knex('transactions')
      .where({id: id, session_id: sessionId})
      .first()

      return { transaction }
    })

  // Summary transaction
  app.get("/summary", { preHandler: [checkSessionIdExists] }, async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount as amount')
        .first()
        
      return { summary }
  })

  // Update transaction by id
  app.put('/:id', {
    preHandler: [checkSessionIdExists]
  } ,  async (request) => {
    const getTransactionSchema = z.object({
      id: z.string().uuid(),
    })

    const { sessionId } = request.cookies
    const { id } = getTransactionSchema.parse(request.params)
    const { title, amount } = request.body as { title: string, amount: number }

    const transaction = await knex('transactions')
    .where({id: id, session_id: sessionId})
    .update({
      title, 
      amount
    })
    
    return transaction
  })

  // Delete transaction by id
  app.delete('/:id', {
    preHandler: [checkSessionIdExists]
  } , async (request) => {
    const getTransactionSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionSchema.parse(request.params)
    const { sessionId } = request.cookies

    const transaction = await knex('transactions')
      .where({id: id, session_id: sessionId})
      .del()
    
    return transaction
  })

}