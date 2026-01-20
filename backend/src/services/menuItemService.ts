// import menuItemsData from '../../data/menuItems.json'

import {  NewMenuItem, MenuItemEntries } from '../types'

import { MenuItem } from '../models/'

// const menuItems: MenuItem[] = menuItemsData.map(item => {
//   return { 
//     ...item, 
//     created_at: new Date(item.created_at), 
//     updated_at: new Date(item.updated_at), 
//   }
// })

const getMenuItems = async (): Promise<MenuItem[]> => {
  const menuItemsFound = await MenuItem.findAll({ raw: true })
  return menuItemsFound
}

const findById = async (id: number): Promise<MenuItem | null> => {
  const menuItem = await MenuItem.findByPk(id)
  return menuItem
}

const addMenuItem = async (item: NewMenuItem): Promise<MenuItem> => {
  const newMenuItem = await MenuItem.create(item)
  return newMenuItem
}

const updateMenuItem = async (updateInfo: MenuItemEntries, id: number): Promise<MenuItem> => {
  const itemToUpdate = await MenuItem.findByPk(id)
  if(!itemToUpdate){
    throw new Error('menu item not found', { cause: 404 })
  }

  const updatedMenuItem = await itemToUpdate.update({ ...updateInfo })

  return updatedMenuItem
} 

const deleteMenuItem = async (id: number) => {
  const MenuItemToDelete = await MenuItem.findByPk(id)
  if(!MenuItemToDelete){
    throw new Error('menu item not found', { cause: 404 })
  }
  await MenuItemToDelete.destroy()
}

export default {
  getMenuItems,
  findById,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
}