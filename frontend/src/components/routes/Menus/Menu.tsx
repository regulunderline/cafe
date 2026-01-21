import { Link } from "react-router-dom"
import type { MenuType } from "../../../types"

const Menu = ({ menu }: { menu: MenuType }) => {
  return (
    <li>
      <Link to={`/menus/${menu.id}`} >{menu.date}</Link>
    </li>
  )
}

export default Menu