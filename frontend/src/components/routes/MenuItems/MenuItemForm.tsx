import { useDispatch, useSelector } from 'react-redux'
import type { FormEvent } from 'react'

import { createMenuItem } from '../../../reducers/menuItemReducer'
import menuItemService from '../../../services/menuItems.ts'
import type { ReducerState } from '../../../types'
import CafeForm from '../../utils/CafeForm.tsx'
import CafeButton from '../../utils/CafeButton.tsx'
import CafeInput from '../../utils/CafeInput.tsx'

const MenuItemForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: ReducerState) => state.user)

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

    const addedMenuItem = await menuItemService.creatNew(newMenuItem, user.token)
    
    event.target.menuItem.value = ''
    event.target.price.value = ''
    event.target.weight.value = ''
    
    dispatch(createMenuItem(addedMenuItem))
  }

  return (
    <CafeForm onSubmit={addMenuItem}>
      <div><CafeInput name="menuItem" placeholder="name" /></div>
      <div><CafeInput name="price" placeholder="price" type="number" /></div>
      <div><CafeInput name="weight" placeholder="weight" type="number" /></div>

      <CafeButton text="add" type="submit" />
    </CafeForm>
  )
}

export default MenuItemForm