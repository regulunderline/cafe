import { useEffect, useRef, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import type { UnknownAction } from "redux"

import { createOneUser } from "../../../reducers/usersReducer.ts"
import { newNotification } from "../../../reducers/notificationReducer.ts"

import type { NewUser } from "../../../types"
import CafeForm from "../../utils/CafeForm.tsx"
import CafeButton from "../../utils/CafeButton.tsx"
import CafeInput from "../../utils/CafeInput.tsx"


const SignUpForm = () => {
  const userRef = useRef<HTMLInputElement>(null)

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [staff, setStaff] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [secret, setSecret] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
      if(userRef.current) {
        userRef.current.focus()
      }
    }, [])

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(password !== confirmPassword) {
      dispatch(newNotification('passwords don\'t match', 'error', 5) as unknown as UnknownAction)
      return
    }

    const newUser: NewUser = { username, name, password }
    if(admin || staff) {
      newUser.secret = secret
      if(admin){
        newUser.admin = true
      }
      if(staff){
        newUser.staff = true
      }
    }

    try {
      const success = await dispatch(createOneUser(newUser) as unknown as UnknownAction)

      if(success) {
        dispatch(newNotification('signed up successfully', 'success', 10) as unknown as UnknownAction)
        navigate('/login')
      }
    } catch (e) {
      if(e instanceof Error) {
        dispatch(newNotification(e.message, 'error', 5) as unknown as UnknownAction)
      }
    }
  }

  return (
    <CafeForm onSubmit={handleSignUp}>
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
          name
          <CafeInput
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
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
      <div>
        <label>
          confirm password
          <CafeInput
            type="password"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          staff
          <CafeInput
            type="checkbox"
            checked={staff}
            onChange={({ target }) => setStaff(target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          admin
          <CafeInput
            type="checkbox"
            checked={admin}
            onChange={({ target }) => setAdmin(target.checked)}
          />
        </label>
      </div>
      {(admin || staff) &&
        <div>
          <label>
            secret
            <CafeInput
              type="text"
              value={secret}
              onChange={({ target }) => setSecret(target.value)}
            />
          </label>
        </div>}
      <CafeButton text="signup" type="submit" />
    </CafeForm>
  )
}

export default SignUpForm