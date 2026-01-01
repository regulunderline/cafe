import type { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { ReducerState } from '../types'
import { LogOut } from '../reducers/userReducer'
import { Navigate } from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch()

  const user = useSelector((state: ReducerState) => state.user)

  const handleLogOut = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    dispatch(LogOut())
  }

  return (
    user
    ? <div>
        logged in as {user.username}
        <button onClick={handleLogOut}>Log out</button>
      </div>
    : <Navigate replace to="/login" />
  )
}

export default Profile