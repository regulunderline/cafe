import menuItemsData from '../../data/menuItems.json'

import { MenuItem, NewMenuItem, MenuItemEntries } from '../types'

const menuItems: MenuItem[] = menuItemsData.map(item => {
  return { 
    ...item, 
    created_at: new Date(item.created_at), 
    updated_at: new Date(item.updated_at), 
  }
})

const getMenuItems = (): MenuItem[] => {
  return menuItems
}

const findById = (id: number): MenuItem | undefined => {
  return menuItems.find(item => item.id === id)
}

const addMenuItem = (item: NewMenuItem): MenuItem => {
  const newMenuItem: MenuItem = {
    id: Math.max(...menuItems.map(i => i.id)) + 1,
    name: item.name, 
    price: item.price,
    weight: item.weight,
    created_at: new Date(),
    updated_at: new Date() 
  }
  if(item.ingredients){
    newMenuItem.ingredients = item.ingredients 
  } 

  menuItems.push(newMenuItem)
  return newMenuItem
}

const updateMenuItem = (updateInfo: MenuItemEntries, id: number): MenuItem => {
  const itemToUpdate = menuItems.find(i => i.id === id)
  if(!itemToUpdate){
    throw new Error('menu item not found', { cause: 404 })
  }

  const updatedMenuItem = { ...itemToUpdate, ...updateInfo, updated_at: new Date }

  menuItems.forEach((item, index) => {
    if(item.id === id) {
      menuItems[index] = updatedMenuItem
    }
  })

  return updatedMenuItem
} 

export default {
  getMenuItems,
  findById,
  addMenuItem,
  updateMenuItem
}