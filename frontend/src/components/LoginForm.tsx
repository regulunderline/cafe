import { useState, type FormEvent } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { logIn } from "../reducers/userReducer.ts"

import type { ReducerState } from "../types"
import type { UnknownAction } from "redux"
import { newNotification } from "../reducers/notificationReducer.ts"


const LoginForm = () => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const user = useSelector((state: ReducerState) => state.user)

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const loggedInUser = await dispatch(logIn({ username, password }) as unknown as UnknownAction)
      if(loggedInUser) {
        dispatch(newNotification(`welcome ${loggedInUser.name}`, 'success', 10) as unknown as UnknownAction)
      }
    } catch (e) {
      if(e instanceof Error) {
        dispatch(newNotification(e.message, 'error', 5) as unknown as UnknownAction)
      }
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