import 'dotenv/config'
import { Knex, knex as setupKnex } from 'knex'

const dbPath = process.env.DATABASE_URL

export const knexConf: Knex.Config = {
  client: 'sqlite3', 
  connection: {
    filename: dbPath as string
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

