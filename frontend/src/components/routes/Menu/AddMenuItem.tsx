import { useDispatch, useSelector } from "react-redux"
import { useEffect, type ChangeEvent } from "react"

import { changeMenu } from "../../../reducers/menuReducer"
import type { StoreState } from "../../../store"
import type { UnknownAction } from "redux"
import { initializeMenuItems } from "../../../reducers/menuItemReducer"

const AddMenuItem = ({ id }: { id: number }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeMenuItems('ALL') as unknown as UnknownAction)
  }, [dispatch, id])

  const menuItems = useSelector((state: StoreState) => state.menuItems.filter(i => !(state.menu?.menuItems.some(item => item.id === i.id))))
  const loggedInUser = useSelector((state: StoreState) => state.user)

  if(!(loggedInUser && (loggedInUser.admin || loggedInUser.staff))) return <></>

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()

    dispatch(changeMenu(id, loggedInUser.token, [Number(event.target.value)]) as unknown as UnknownAction)
  }

  return (
    <label>
      Add
      <select defaultValue="" name="choose one to add" onChange={handleSelect}>
        <option value="" />
        {menuItems.map(i => <option key={i.id} value={i.id}>
          {i.name}
        </option>)}
      </select>
    </label>
  )
}

export default AddMenuItem