import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MenuItem from '../MenuItem'
import MenuItemForm from './MenuItemForm.tsx'
import VisibilityFilter from '../../utils/VisibilityFilter.tsx'

import { initializeMenuItems } from "../../../reducers/menuItemReducer.ts"
import type { ReducerState } from '../../../types'

const MenuItems = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: ReducerState) => state.user)

  useEffect(() => {
      // @ts-expect-error will type later
      dispatch(initializeMenuItems())
    }, [dispatch])

  const menuItems = useSelector((state: ReducerState) => {
    switch (state.filter){
      case 'INGREDIENTS':
        return state.menuItems.filter(item => item.ingredients)
      case 'NOINGREDIENTS':
        return state.menuItems.filter(item => !item.ingredients)
      default:
        return state.menuItems
    }
  })

  return (
    <div>
      {(user && (user.staff || user.admin)) && <MenuItemForm />}
      <VisibilityFilter />
      <h2>Menu Items</h2>
      <ul>
        {menuItems.map(menuItem => (
          <MenuItem
            key={menuItem.id}
            menuItem={menuItem}
          />
        ))}
      </ul>
    </div>
  )
}

export default MenuItems