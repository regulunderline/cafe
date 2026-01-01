import { useState, type FormEvent } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import loginService from '../services/login.ts'

import { setUser } from "../reducers/userReducer.ts"

import type { ReducerState } from "../types"


const LoginForm = () => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const user = useSelector((state: ReducerState) => state.user)

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      dispatch(setUser(user))
    } catch (e) {
      console.log(e)
    }
  }

  return user ? <Navigate replace to="/" /> : <>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  </>
}

export default LoginForm