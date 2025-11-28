import express from 'express'

import { PORT } from './src/utils/config'

import menuItemsRouter from './src/routes/menuItems' 
import userRouter from './src/routes/users'
import loginRouter from './src/routes/login' 

import { connectToDatabase } from './src/utils/db'

const app = express()

app.use(express.json())

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

app.use('/api/menuItems', menuItemsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

void start()