import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import MenuItems from "./components/MenuItems.tsx"
import LoginForm from "./components/LoginForm.tsx"
import Users from "./components/Users.tsx"
import Profile from "./components/Profile.tsx"

import { setUser } from "./reducers/userReducer.ts"
import Header from "./components/Header.tsx"
import Home from "./components/Home.tsx"
import User from './components/User.tsx'
import SignUp from "./components/SignUp.tsx"
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
