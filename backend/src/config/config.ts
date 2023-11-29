import dotenv from 'dotenv'

dotenv.config()

export const MONGO_URL = process.env.MONGO_URL || null
export const PORT = process.env.SERVER_PORT || 5000
