import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { errorHandler } from '../utils/middleware'
import { parseUsername, parsePassword } from '../utils/validators/userValidators'
import { SECRET } from '../utils/config'

import { Response } from 'express'
import { User } from '../models'
import Session from '../models/session'
import { FrontEndUser, UserTokenInfo } from '../types'

const router = express.Router()

router.post('/', async (
  { body }: { body:unknown }, 
  res: Response<FrontEndUser>
) => {
  if(!body || typeof body !== 'object'){
    throw new Error('incorrect or missing data')
  }

  if(!('username' in body)){
    throw new Error('username is missing', { cause: 401 })
  }
  const user = await User.findOne({
    where: {
      username: parseUsername(body.username)
    }
  })

  if(!('password' in body)){
    throw new Error('password is missing', { cause: 404 })
  }
  if(!(user && await bcrypt.compare(parsePassword(body.password), user.password))){
    throw new Error('invalid username or password', { cause: 401 })
  }

  const session = await Session.create( { userId: user.id }) 
  console.log(session.id, 'a')

  const userForToken: UserTokenInfo = {
    username: user.username,
    id: user.id,
    sessionId: session.id
  }

  const token = jwt.sign(userForToken, SECRET)

  const { username, name, id, disabled, staff, admin, created_at, updated_at } = user

  res.json({ token, username, name, id, disabled, staff, admin, created_at, updated_at })
})

router.use(errorHandler)

export default router