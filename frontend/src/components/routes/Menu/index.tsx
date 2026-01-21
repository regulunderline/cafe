import type { UnknownAction } from "@reduxjs/toolkit"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { setMenuById } from "../../../reducers/menuReducer"
import type { StoreState } from "../../../store"

const Menu = () => {
  const id = Number(useParams().id)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setMenuById(id) as unknown as UnknownAction)
  }, [dispatch, id])

  const menu = useSelector((state: StoreState) => state.menu)

  if(!menu) return <>menu not found</>

  return (
    <div>
      <h1>Menu for {new Date(menu.date).toDateString()}</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>price</th>
            <th>weight</th>
            <th>ingredients</th>
          </tr>
        </thead>
        <tbody>
          {menu.menuItems.map(item => <tr key={item.id}>
            <td>{item.name}</td>
            <td>{(item.price / 100).toLocaleString(undefined, {
              style: 'currency',
              currency: 'USD',
            })}</td>
            <td>{item.weight}</td>
            <td><ul>
              {item.ingredients && item.ingredients.map(i => <li key={i}>{i}</li>)}
            </ul></td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Menu