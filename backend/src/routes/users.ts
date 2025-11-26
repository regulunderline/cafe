import express from 'express'

import userService from '../services/userService'

import { errorHandler } from '../utils/middleware'
import { toNewUser, toUpdateUserInfo } from '../utils/validators/userValidators'

import { Response } from 'express'
import { NonSensetiveUser } from '../types'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensetiveUser[]>) => {
  const users: NonSensetiveUser[] = userService.getAllNonSensetive()
  res.send(users)
})

router.get('/:id', (req, res: Response<NonSensetiveUser>) => {
  const user = userService.findByIdNonSensative(Number(req.params.id))

  if(user) { 
    res.send(user)
  } else {
    throw new Error('user not found', { cause: 404 })
  }
})

router.post('/', (req, res: Response<NonSensetiveUser>, next) => {
  try {
    const newUser = toNewUser(req.body)

    const addedUser = userService.addOne(newUser)
    res.send(addedUser)
  } catch (e){
    next(e)
  }
})

router.put('/:id', (req, res: Response<NonSensetiveUser>, next) => {
  try {
    const updateInfo = toUpdateUserInfo(req.body)
    const updatedUser = userService.updateOne(updateInfo, Number(req.params.id))
    res.send(updatedUser)
  } catch (e){
    next(e)
  }
})

router.use(errorHandler)

export default router