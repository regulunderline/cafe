import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import type { StoreState  } from "../store"

const Header = () => {
    const user = useSelector((state: StoreState) => state.user)

  const padding = {
    padding: 5
  }

  return (
    <div>
    <Link style={padding} to="/menuItems">Menu Items</Link>
    <Link style={padding} to="/menus">Menus</Link>
    <Link style={padding} to="/users">users</Link>
    {user
      ? <Link style={padding} to="/profile">profile</Link>
      : <>
        <Link style={padding} to="/login">log in</Link>
        <Link style={padding} to="/signup">sign up</Link>
      </>
    }
  </div>
  )
}

export default Header