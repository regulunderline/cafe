import { useState, type FormEvent } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { createOneUser } from "../reducers/usersReducer.ts"

import type { UnknownAction } from "redux"
import type { NewUser, ReducerState } from "../types"


const SignUp = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [staff, setStaff] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [secret, setSecret] = useState('')

  const dispatch = useDispatch()

  const user = useSelector((state: ReducerState) => state.user)

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(password !== confirmPassword) return

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
      dispatch(createOneUser(newUser) as unknown as UnknownAction)
      setUsername('')
      setName('')
      setPassword('')
      setConfirmPassword('')
      setStaff(false)
      setAdmin(false)
      setSecret('')
    } catch (e) {
      console.log(e)
    }
  }

  return user ? <Navigate replace to="/" /> : <>
    <h2>Sign Up</h2>
    <form onSubmit={handleSignUp}>
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
          name
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
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
      <div>
        <label>
          confirm password
          <input
            type="password"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          staff
          <input
            type="checkbox"
            checked={staff}
            onChange={({ target }) => setStaff(target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          admin
          <input
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
            <input
              type="text"
              value={secret}
              onChange={({ target }) => setSecret(target.value)}
            />
          </label>
        </div>}
      <button type="submit">signup</button>
    </form>
  </>
}

export default SignUp