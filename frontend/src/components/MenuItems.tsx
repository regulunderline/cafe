import { useSelector } from 'react-redux'

import MenuItem from './MenuItem'
import type { ReducerState } from '../types'

const MenuItems = () => {
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
    <ul>
      {menuItems.map(menuItem => (
        <MenuItem
          key={menuItem.id}
          menuItem={menuItem}
        />
      ))}
    </ul>
  )
}

export default MenuItems