import type { MouseEvent } from "react"
import { Link } from "react-router-dom"
import type { UnknownAction } from "redux"
import { useDispatch, useSelector } from "react-redux"

import { changeMenu } from "../../../reducers/menuReducer"

import CafeButton from "../../utils/CafeButton"

import type { StoreState } from "../../../store"
import type { MenuItemType } from "../../../types"


const MenuRow = ({ item, id } : { item: MenuItemType, id: number }) => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state: StoreState) => state.user)

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    dispatch(changeMenu(id, loggedInUser ? loggedInUser.token : '', null, [item.id]) as unknown as UnknownAction)
  }

  return (
    <tr key={item.id}>
      <td><Link to={`/menuItems/${item.id}`}>{item.name}</Link></td>

      <td>{(item.price / 100).toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
      })}</td>

      <td>{item.weight}</td>

      <td><ul>
        {item.ingredients && item.ingredients.map(i => <li key={i}>{i}</li>)}
      </ul></td>

      {(loggedInUser && (loggedInUser.staff || loggedInUser.admin)) && <td><CafeButton onClick={handleRemove} text="remove"/></td>}
    </tr>
  )
}

export default MenuRow