import { useEffect, useRef, useState, type FormEvent } from "react"
import { useDispatch } from "react-redux"
import type { UnknownAction } from "redux"

import { logIn } from "../../../reducers/userReducer.ts"
import { newNotification } from "../../../reducers/notificationReducer.ts"

import CafeButton from "../../utils/CafeButton.tsx"
import CafeInput from "../../utils/CafeInput.tsx"
import CafeForm from "../../utils/CafeForm.tsx"

const LoginForm = () => {
  const userRef = useRef<HTMLInputElement>(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    if(userRef.current) {
      userRef.current.focus()
    }
  }, [])

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

  return (
    <CafeForm onSubmit={handleLogin}>
      <div>
        <label>
          username
          <CafeInput
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            ref={userRef}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <CafeInput
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <CafeButton text="login" type="submit" />
    </CafeForm>
  )
}

export default LoginForm