import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import MenuItems from "./components/routes/MenuItems"
import LoginForm from "./components/routes/Login"
import Users from "./components/routes/Users"
import Profile from "./components/routes/Profile"

import { setUser } from "./reducers/userReducer.ts"
import Header from "./components/Header.tsx"
import Home from "./components/routes/Home"
import User from './components/routes/User'
import SignUp from "./components/routes/SignUp"
import Notification from "./components/Notification.tsx"

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
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<User />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </Router>
}

export default App
