import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { initializeMenuItems } from "./reducers/menuItemReducer.ts"
import MenuItemForm from "./components/MenuItemForm.tsx"

import MenuItems from "./components/MenuItems.tsx"
import VisibilityFilter from "./components/VisibilityFilter.tsx"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-expect-error will type later
    dispatch(initializeMenuItems())
  }, [dispatch])

  return <div>
    <VisibilityFilter />
    <MenuItemForm />
    <MenuItems />
  </div>
}

export default App
