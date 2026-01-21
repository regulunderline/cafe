import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import { setUser } from './reducers/userReducer.ts'

import Header from './components/Header.tsx'
import Notification from './components/Notification.tsx'
import MenuItems from './components/routes/MenuItems'
import MenuItem from './components/routes/MenuItem'
import Menus from './components/routes/Menus/index.tsx'
import Menu from './components/routes/Menu/index.tsx'
import Users from "./components/routes/Users"
import User from './components/routes/User'
import Login from './components/routes/Login'
import SignUp from './components/routes/SignUp'
import Profile from './components/routes/Profile'
import Home from './components/routes/Home'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedCafeUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  return <Router>
    <Header />
    <Notification />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menuItems" element={<MenuItems />} />
      <Route path="/menuItems/:id" element={<MenuItem />} />
      <Route path="/menus" element={<Menus />} />
      <Route path="/menus/:id" element={<Menu />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<User />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </Router>
}

export default App
