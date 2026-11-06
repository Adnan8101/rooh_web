import { MongoClient } from 'mongodb'

const g = globalThis as { mongo?: Promise<MongoClient> }
const client = (g.mongo ??= new MongoClient(process.env.MONGODB_URI!, { maxPoolSize: 3 }).connect())

export const db = async () => (await client).db('rooh')
