import type { UnknownAction } from "@reduxjs/toolkit"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { setMenuById } from "../../../reducers/menuReducer"
import type { StoreState } from "../../../store"
import MenuTable from "./MenuTable"
import AddMenuItem from "./AddMenuItem"

const Menu = () => {
  const id = Number(useParams().id)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setMenuById(id) as unknown as UnknownAction)
  }, [dispatch, id])

  const date = useSelector((state: StoreState) => state.menu ? state.menu.date : null)

  if(!date) return <>menu not found</>

  return (
    <div>
      <h1>Menu for {new Date(date).toDateString()}</h1>
      <AddMenuItem id={id} />
      <MenuTable />
    </div>
  )
}

export default Menu