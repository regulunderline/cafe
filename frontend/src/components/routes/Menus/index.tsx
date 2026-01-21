import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { UnknownAction } from "@reduxjs/toolkit"

import { initializeMenus } from "../../../reducers/menusReducer"
import Menu from "./Menu"
import type { StoreState } from "../../../store"

const Menus = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeMenus() as unknown as UnknownAction)
  }, [dispatch])

  const menus = useSelector((state: StoreState) => state.menus)
  
  return (
    <div>
      <ul>
        {menus.map(menu => <Menu key={menu.id} menu={menu} />)}
      </ul>
    </div>
  )
}

export default Menus