import type { MenuItemType } from '../types'

const MenuItem = ({ menuItem } : { menuItem: MenuItemType }) => {
  return (
    <li key={menuItem.id}>
      {menuItem.name}
    </li>
  )
}

export default MenuItem