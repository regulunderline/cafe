import { useSelector } from "react-redux"

import type { StoreState } from "../../../store"
import MenuRow from "./MenuRow"

const MenuTable = () => {
  const menu = useSelector((state: StoreState) => state.menu)
  const loggedInUser = useSelector((state: StoreState) => state.user)

  if(!menu) return <>menu not found</>

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>price</th>
          <th>weight</th>
          <th>ingredients</th>
          {(loggedInUser && loggedInUser.staff) && <th></th>}
        </tr>
      </thead>
      <tbody>
        {menu.menuItems.map(item => <MenuRow
          key={item.id}
          item={item}
          id={menu.id}
        />)}
      </tbody>
    </table>
  )
}

export default MenuTable