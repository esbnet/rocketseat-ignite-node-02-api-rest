import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";

export async function transactionsRoutes(app: FastifyInstance) {

// Add transaction
app.post('/transaction', async (request: FastifyRequest, reply: FastifyReply) => {
  const { title, amount } = request.body as { title: string, amount: number }
  const transaction = knex('transactions').insert({
    id: crypto.randomUUID(),
    title, 
    amount
  })
  return reply.status(201).send(transaction)
})

// List all transactions
app.get('/transactions', async (request: FastifyRequest, reply: FastifyReply) => {  
  const transactions = knex('transactions').select('*')  
  return transactions
})

// Find transaction by id
app.get('/transaction/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string }
  const transaction = knex('transactions').where('id', id).first()
  return transaction
})

// Update transaction by id
app.put('/transaction/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string }
  const { title, amount } = request.body as { title: string, amount: number }
  const transaction = knex('transactions').where('id', id).update({
    title, 
    amount
  })
  return transaction
})

// Update transaction by id
app.delete('/transaction/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string }
  const transaction = knex('transactions').where('id', id).del()
  return transaction
})


}