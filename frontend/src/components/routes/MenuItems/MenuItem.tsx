import { Link } from 'react-router-dom'
import type { MenuItemType } from '../../../types'

const MenuItem = ({ menuItem } : { menuItem: MenuItemType }) => {
  return (
    <li key={menuItem.id}>
      <Link to={`/menuItems/${menuItem.id}`}>{menuItem.name}</Link>
    </li>
  )
}

export default MenuItem