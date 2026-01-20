import { Op } from 'sequelize'
import { MenusMenuItems } from '../models/'

const addMenusMenuItems = async (menuId: number, menuItemIds: number[]): Promise<MenusMenuItems[]> => {
  const menusMenuItems = await MenusMenuItems.bulkCreate(menuItemIds.map(id => {
    return { menuId, menuItemId: id }
  }))
  return menusMenuItems
}

const deleteByIds = async (menuId: number, menuItemIds: number[]): Promise<number> => {
  const itemsDeleted = await MenusMenuItems.destroy({
    where: {
      menuId,
      menuItemId: {
        [Op.in]: menuItemIds
      }
    }
  })
  if(!itemsDeleted){
    throw new Error('not found', { cause: 404 })
  }
  return itemsDeleted
}

const deleteAll = async (menuId: number): Promise<number> => {
  const itemsDeleted = await MenusMenuItems.destroy({
    where: {
      menuId
    }
  })
  if(!itemsDeleted){
    throw new Error('not found', { cause: 404 })
  }
  return itemsDeleted
}

export default {
  addMenusMenuItems,
  deleteByIds,
  deleteAll
}