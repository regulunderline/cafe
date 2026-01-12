import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MenuItem from './MenuItem'
import MenuItemForm from './MenuItemForm.tsx'
import VisibilityFilter from '../../utils/VisibilityFilter.tsx'

import { initializeMenuItems } from "../../../reducers/menuItemReducer.ts"

import type { StoreState } from '../../../store.ts'
import type { UnknownAction } from 'redux'

const MenuItems = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: StoreState) => state.user)
  const category = useSelector((state: StoreState) => state.filter)

  useEffect(() => {
    dispatch(initializeMenuItems(category) as unknown as UnknownAction)
  }, [dispatch, category])

  const menuItems = useSelector((state: StoreState) => state.menuItems)

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