import { MongoClient } from 'mongodb'

const g = globalThis as { mongo?: Promise<MongoClient> }

function client() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set — add it in Vercel → Settings → Environment Variables')
  return (g.mongo ??= new MongoClient(uri, { maxPoolSize: 3 }).connect().catch((e) => {
    g.mongo = undefined // don't cache a failed connection
    throw e
  }))
}

export const db = async () => (await client()).db('rooh')
