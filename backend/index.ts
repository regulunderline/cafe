import express from 'express'

import menuRouter from './src/routes/menu' 

const app = express()

app.use(express.json())

const PORT = 3001

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

app.use('/api/menu', menuRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})