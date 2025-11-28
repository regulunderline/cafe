import express from 'express'
import bcrypt from 'bcrypt'

import userService from '../services/userService'

import { checkForStaffAndAdmin, errorHandler, tokenExtractor } from '../utils/middleware'
import { toNewUser, toUpdateUserInfo } from '../utils/validators/userValidators'

import { Response, Request } from 'express'
import { NonSensetiveUser, UserTokenInfo } from '../types'

const router = express.Router()

router.get('/', async (_req, res: Response<NonSensetiveUser[]>) => {
  const users: NonSensetiveUser[] = await userService.getAllNonSensetive()
  res.send(users)
})

router.get('/:id', async (req, res: Response<NonSensetiveUser>) => {
  const user = await userService.findByIdNonSensative(Number(req.params.id))

  if(user) { 
    res.send(user)
  } else {
    throw new Error('user not found', { cause: 404 })
  }
})

router.post('/', async (req, res: Response<NonSensetiveUser>, next) => {
  try {
    const newUser = toNewUser(req.body)

    const addedUser = await userService.addOne({...newUser, password: await bcrypt.hash(newUser.password, 10)})
    res.send(addedUser)
  } catch (e){
    next(e)
  }
})

router.put('/:id', tokenExtractor, checkForStaffAndAdmin, async (
  req: Request & { decodedToken?: UserTokenInfo, admin?: boolean, staff?: boolean }, 
  res: Response<NonSensetiveUser>, 
  next
) => {
  try {
    if(!(req.admin || (req.decodedToken && req.decodedToken.id === Number(req.params.id)))){
      throw new Error('only admins can change other users', { cause : 401 })
    }

    const updateInfo = toUpdateUserInfo(req.body)
    const updatedUser = await userService.updateOne(updateInfo, Number(req.params.id))
    res.send(updatedUser)
  } catch (e){
    next(e)
  }
})

router.delete('/:id', tokenExtractor, checkForStaffAndAdmin, async (
  req: Request & { decodedToken?: UserTokenInfo, admin?: boolean, staff?: boolean }, 
  res, 
  next
) => {
  try {
    if(!(req.admin || (req.decodedToken && req.decodedToken.id === Number(req.params.id)))){
      throw new Error('only admins can delete other users', { cause : 401 })
    }

    await userService.deleteOne(Number(req.params.id))
    res.status(204).end()
  } catch (e){
    next(e)
  }
})

router.use(errorHandler)

export default router