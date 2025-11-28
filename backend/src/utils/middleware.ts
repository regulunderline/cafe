import { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'sequelize'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

import { SECRET } from './config'
import { isString } from './validators/helpers'
import { UserTokenInfo } from '../types'
import { toUserTokenInfo } from './validators/userValidators'
import { User } from '../models'
import Session from '../models/session'

export const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  const setStatus = () => {
    switch (error.cause) {
      case 400:
        return 400
      case 401: 
        return 401
      case 404:
        return 404
      default:
        return 520
    }
  }
  if (error instanceof JsonWebTokenError) {
    res.status(401).json({ error: error.message })
  } else if (error instanceof ValidationError) {
    res.status(401).json(error.errors.map(e => e.message))
  } else {
    res.status(setStatus()).send({ error: error.message })
  }
  next(error)
}

export const tokenExtractor = async (req: Request & { decodedToken?: UserTokenInfo }, _res: Response, next: NextFunction) => {
  const authorization: unknown = req.get('authorization')
  if (authorization && isString(authorization) && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const decodedTokenInfo = jwt.verify(authorization.substring(7), SECRET)
      const { sessionId, ...decodedToken } = toUserTokenInfo(decodedTokenInfo)

      const session = await Session.findByPk(sessionId)
      console.log(session, sessionId)
      if(!(session && session.userId === decodedToken.id)){
        throw new Error('session not found', { cause: 400 })
      }

      req.decodedToken = decodedToken
    } catch(e){
      next(e)
    }
  }  else {
    next(new Error('invalid token', { cause: 401 }))
  }
  next()
}

export const checkForStaffAndAdmin = async (req: Request & { decodedToken?: UserTokenInfo, admin?: boolean, staff?: boolean }, _res: Response, next: NextFunction) => {
  if(!req.decodedToken){
    throw new Error('token missing', { cause: 401 })
  }
  const user = await User.findByPk(req.decodedToken.id)
  if(user && user.admin){
    req.admin = true
  } else {
    req.admin = false
  }
  if(user && user.staff){
    req.staff = true
  } else {
    req.staff = false
  }
  next()
}