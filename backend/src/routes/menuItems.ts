import express from 'express'

import menuService from '../services/menuItemService'

import { errorHandler } from '../utils/middleware'
import { toNewMenuItem, toUpdateMenuItemInfo } from '../utils/validators/menuValidators'

import { Response } from 'express'
import { MenuItem } from '../models'

const router = express.Router()

router.get('/', async (_req, res: Response<MenuItem[]>) => {
  const menuItems: MenuItem[] = await menuService.getMenuItems()
  res.send(menuItems)
})

router.get('/:id', async (req, res: Response<MenuItem>) => {
  const menuItem = await menuService.findById(Number(req.params.id))

  if(menuItem) { 
    res.send(menuItem)
  } else {
    throw new Error('menu item not found', { cause: 404 })
  }
})

router.post('/', async (req, res: Response<MenuItem>, next) => {
  try {
    const newMenuItem = toNewMenuItem(req.body)

    const addedMenuItem = await menuService.addMenuItem(newMenuItem)
    res.send(addedMenuItem)
  } catch (e){
    console.log(e)
    next(e)
  }
})

router.put('/:id', async (req, res: Response<MenuItem>, next) => {
  try {
    const updateInfo = toUpdateMenuItemInfo(req.body)
    const updatedMenuItem = await menuService.updateMenuItem(updateInfo, Number(req.params.id))
    res.json(updatedMenuItem)
  } catch (e){
    next(e)
  }
})

router.delete('/:id', async(req, res, next) => {
  try {
    await menuService.deleteMenuItem(Number(req.params.id))
    res.status(204).end()
  } catch (e){
    next(e)
  }
})

router.use(errorHandler)

export default router