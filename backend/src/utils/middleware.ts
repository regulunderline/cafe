import { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'sequelize'

export const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  const setStatus = () => {
    switch (error.cause) {
      case 401: 
        return 401
      case 404:
        return 404
      default:
        return 520
    }
  }
  if (error instanceof ValidationError) {
    res.status(401).json(error.errors.map(e => e.message))
  }
  res.status(setStatus()).json({ error: error.message })
  next(error)
}