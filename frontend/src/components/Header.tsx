import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import type { ReducerState } from "../types"

const Header = () => {
    const user = useSelector((state: ReducerState) => state.user)

  const padding = {
    padding: 5
  }

  return (
    <div>
    <Link style={padding} to="/menuItems">Menu Items</Link>
    <Link style={padding} to="/users">users</Link>
    {user
      ? <Link style={padding} to="/profile">profile</Link>
      : <>
        <Link style={padding} to="/login">login</Link>
      </>
    }
  </div>
  )
}

export default Header