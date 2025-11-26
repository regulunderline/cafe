import express from 'express'

import { PORT } from './src/utils/config'

import menuRouter from './src/routes/menuItems' 
import userRouter from './src/routes/users' 

import { connectToDatabase } from './src/utils/db'

const app = express()

app.use(express.json())

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

app.use('/api/menu', menuRouter)
app.use('/api/users', userRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

void start()