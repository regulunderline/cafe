import express from 'express'

import menuService from '../services/menuService'
import menusMenuItemsService from '../services/menusMenuItemsService'

import { checkForStaffAndAdmin, errorHandler, tokenExtractor } from '../utils/middleware'

import { Response, Request } from 'express'
import { Menu } from '../models'
import { UserTokenInfo } from '../types'
import { isArrayOfNumbers, isString } from '../utils/validators/helpers'

const router = express.Router()

router.get('/', async (_req, res: Response<Menu[]>) => {
  const menuItems = await menuService.getMenus()
  res.send(menuItems)
})

router.get('/search', async (req, res: Response<Menu>) => {
  if(!(
    req.query.date
    && isString(req.query.date)
  )){
    throw new Error('you can only search by date', { cause: 400 })
  }
  const menu = await menuService.findByDate(req.query.date)

  if(menu) { 
    res.send(menu)
  } else {
    throw new Error('menu not found', { cause: 404 })
  }
})

router.get('/:id', async (req, res: Response<Menu>) => {
  const menu = await menuService.findById(Number(req.params.id))

  if(menu) { 
    res.send(menu)
  } else {
    throw new Error('menu not found', { cause: 404 })
  }
})

router.post('/', tokenExtractor, checkForStaffAndAdmin, async (
  req: Request & { decodedToken?: UserTokenInfo, admin?: boolean, staff?: boolean }, 
  res: Response<Menu>, 
  next
) => {
  try {
    if(!(req.staff || req.admin)){
      throw new Error('only staff and admins can do this', { cause: 401 })
    }

    const params: unknown = req.body
    if(!(
      params
      && (typeof params === 'object')
      && ('date' in params)
      && isString(params.date)
    )){
      throw new Error('menu date missing or invalid', { cause: 400 })
    }

    const addedMenu = await menuService.addMenu(new Date(params.date))

    if(('ids' in params) && Array.isArray(params.ids) && isArrayOfNumbers(params.ids)){
      await menusMenuItemsService.addMenusMenuItems(addedMenu.id, params.ids)

      const fullAddedMenu = await menuService.findById(addedMenu.id)
      if(fullAddedMenu){
        res.send(fullAddedMenu)
      } else {
        throw new Error('something went wrong', { cause: 520 })
      }
    } else {
      res.send(addedMenu)
    }
  } catch (e){
    console.log(e)
    next(e)
  }
})

router.put('/:id', tokenExtractor, checkForStaffAndAdmin, async (
  req: Request & { decodedToken?: UserTokenInfo, admin?: boolean, staff?: boolean }, 
  res: Response<Menu>, 
  next
) => {
  try {
    if(!(req.staff || req.admin)){
      throw new Error('only staff and admins can do this', { cause: 401 })
    }

    const params: unknown = req.body

    if(!(
      params
      && (typeof params === 'object')
      && (('ids' in params) || ('idsToDelete' in params))
    )){
      throw new Error('please provide ids or idsToDelete of menu items', { cause: 400 })
    }

    if('ids' in params){
      if(
        !(Array.isArray(params.ids)
        && isArrayOfNumbers(params.ids))
      ){
        throw new Error('please provide ids of menu items in form of array', { cause: 400 })
      }

      await menusMenuItemsService.addMenusMenuItems(Number(req.params.id), params.ids)
    }

    if('idsToDelete' in params){
      if(
        !(Array.isArray(params.idsToDelete)
        && isArrayOfNumbers(params.idsToDelete))
      ){
        throw new Error('please provide idsToDelete of menu items in form of array', { cause: 400 })
      }

      await menusMenuItemsService.deleteByIds(Number(req.params.id), params.idsToDelete)
    }

    const updatedMenu = await menuService.findById(Number(req.params.id))
    if(!updatedMenu){
      throw new Error('menu not found', { cause: 404 })
    }

    res.json(updatedMenu)
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
    if(!req.admin){
      throw new Error('only admins can do this', { cause: 401 })
    }

    await menusMenuItemsService.deleteAll(Number(req.params.id))
    await menuService.deleteMenu(Number(req.params.id))
    res.status(204).end()
  } catch (e){
    next(e)
  }
})

router.use(errorHandler)

export default router