import { useDispatch, useSelector } from 'react-redux'
import type { FormEvent } from 'react'

import { createMenuItem } from '../../../reducers/menuItemReducer'
import { newNotification } from '../../../reducers/notificationReducer.ts'

import CafeForm from '../../utils/CafeForm.tsx'
import CafeButton from '../../utils/CafeButton.tsx'
import CafeInput from '../../utils/CafeInput.tsx'

import type { UnknownAction } from 'redux'
import type { StoreState } from '../../../store.ts'
import { Categories, type MenuItemType } from '../../../types/index.ts'
import SelectCategory from '../../utils/SelectCategory.tsx'

const MenuItemForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: StoreState) => state.user)

  const addMenuItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(!(
       ('menuItem' in event.target) && (event.target.menuItem instanceof HTMLInputElement) && (event.target.menuItem.type === 'text')
       && ('price' in event.target) && (event.target.price instanceof HTMLInputElement) && (event.target.price.type === 'number')
       && ('category' in event.target) && (event.target.category instanceof HTMLSelectElement) && (Categories.includes(event.target.category.value.toUpperCase() as typeof Categories[number]))
       && ('weight' in event.target) && (event.target.weight instanceof HTMLInputElement) && (event.target.weight.type === 'number')
    )){
      throw new Error('to add a menu item use the input fields with names menuItem, price, weight, category and ingredients')
    }

    const newMenuItem = {
      name: event.target.menuItem.value,
      price: Number(event.target.price.value) * 100,
      weight: Number(event.target.weight.value),
      category: event.target.category.value as typeof Categories[number]
    }

    try{
      const addedMenuItem = await dispatch(createMenuItem(newMenuItem, user.token) as unknown as UnknownAction) as unknown as MenuItemType

      if(addedMenuItem){
        dispatch(newNotification(`added ${addedMenuItem.name}`, 'success', 10) as unknown as UnknownAction)
        event.target.menuItem.value = ''
        event.target.price.value = ''
        event.target.weight.value = ''
        event.target.category.value = Categories[0]
      }
    } catch (e) {
      if(e instanceof Error){
        dispatch(newNotification(e.message, 'error', 5) as unknown as UnknownAction)
      } else {
        console.log(e)
      }
    }
  }

  return (
    <CafeForm onSubmit={addMenuItem}>
      <div><CafeInput name="menuItem" placeholder="name" /></div>
      <div><CafeInput name="price" placeholder="price in usd" type="number" step="0.01" min="0" /></div>
      <div><CafeInput name="weight" placeholder="weight" type="number" /></div>
      <div><label>category<SelectCategory name="category" /></label></div>

      <CafeButton text="add" type="submit" />
    </CafeForm>
  )
}

export default MenuItemForm