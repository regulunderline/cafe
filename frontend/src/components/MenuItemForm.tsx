import { useDispatch } from 'react-redux'
import type { FormEvent } from 'react'

import { createMenuItem } from '../reducers/menuItemReducer'
import menuItemService from '../services/menuItems.ts'

const MenuItemForm = () => {
  const dispatch = useDispatch()

  const addMenuItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(!(
       ('menuItem' in event.target) && (event.target.menuItem instanceof HTMLInputElement) && (event.target.menuItem.type === 'text')
       && ('price' in event.target) && (event.target.price instanceof HTMLInputElement) && (event.target.price.type === 'number')
       && ('weight' in event.target) && (event.target.weight instanceof HTMLInputElement) && (event.target.weight.type === 'number')
    )){
      throw new Error('to add a menu item use the input fields with names menuItem, price, weight and ingredients')
    }

    const newMenuItem = {
      name: event.target.menuItem.value,
      price: Number(event.target.price.value),
      weight: Number(event.target.weight.value)
    }

    const addedMenuItem = await menuItemService.creatNew(newMenuItem)
    
    event.target.menuItem.value = ''
    event.target.price.value = ''
    event.target.weight.value = ''
    
    dispatch(createMenuItem(addedMenuItem))
  }

  return (
    <form onSubmit={addMenuItem}>
      <p><input name="menuItem" placeholder="name" /></p>
      <p><input name="price" placeholder="price" type="number"/></p>
      <p><input name="weight" placeholder="weight" type="number"/></p>

      <button type="submit">add</button>
    </form>
  )
}

export default MenuItemForm