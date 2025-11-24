import express from 'express'

import menuService from '../services/menuService'

import { errorHandler } from '../utils/middleware'
import { toNewMenuItem, toUpdateInfo } from '../utils/validators'

import { Response } from 'express'
import { MenuItem } from '../types'

const router = express.Router()

router.get('/', (_req, res: Response<MenuItem[]>) => {
  const menu: MenuItem[] = menuService.getMenuItems()
  res.send(menu)
})

router.get('/:id', (req, res: Response<MenuItem>) => {
  const menuItem = menuService.findById(Number(req.params.id))

  if(menuItem) { 
    res.send(menuItem)
  } else {
    res.status(404).end()
  }
})

router.post('/', (req, res, next) => {
  try {
    const newMenuItem = toNewMenuItem(req.body)

    const addedMenuItem = menuService.addMenuItem(newMenuItem)
    res.send(addedMenuItem)
  } catch (e){
    next(e)
  }
})

router.put('/:id', (req, res: Response<MenuItem>, next) => {
  try {
    const updateInfo = toUpdateInfo(req.body)
    const updatedMenuItem = menuService.updateMenuItem(updateInfo, Number(req.params.id))
    res.json(updatedMenuItem)
  } catch (e){
    next(e)
  }
})

router.use(errorHandler)

export default router