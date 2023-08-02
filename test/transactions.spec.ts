import { execSync } from 'node:child_process'
import { beforeEach } from 'node:test'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app'

describe('Transactions', () => {
  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all') 
    execSync('npm run knex migrate:latest')
  })
  
  beforeAll(async () => {
    await app.ready()
  })
  
  afterAll(async () => {
    await app.close()
  })

  it.only('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test',
        amount: 100,
        type: 'credit',
      }).expect(201)
  }) 

  it.only('should be able to list all transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Test',
        amount: 100,
        type: 'credit',
      })

      const cookies = createTransactionResponse.get('Set-Cookie')
      
      const listTransactionResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', cookies)
        .expect(200)

        expect(listTransactionResponse.body.transactions).toEqual([
          expect.objectContaining({
            title: 'Test',
            amount: 100
          })
        ])
  }) 
  
})
