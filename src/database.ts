import { Knex, knex as setupKnex } from 'knex'
import { env } from './env'

export const knexConf: Knex.Config = {
  client: 'sqlite3', 
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './data/migrations',
    tableName: 'migrations',
  },
  seeds: {

  }
}

export const knex = setupKnex(knexConf)