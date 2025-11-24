import { Request, Response, NextFunction } from 'express'

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
  res.status(setStatus()).json({ error: error.message })
  next(error)
}