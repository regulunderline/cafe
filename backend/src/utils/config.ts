import 'dotenv/config'

export const PORT: number = Number(process.env.PORT) || 3001

export const ADMIN_SECRET: string = process.env.ADMIN_SECRET || 'secret'
export const STUFF_SECRET: string = process.env.STUFF_SECRET || 'secret'

export const POSTGRES_URL = process.env.POSTGRES_URL