import type { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { LogOut } from '../../../reducers/userReducer'

import type { ReducerState } from '../../../types'
import CafeButton from '../../utils/CafeButton'

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
        <div>logged in as {user.username}</div>
        <div><CafeButton text="Log Out" onClick={handleLogOut} /></div>
      </div>
    : <Navigate replace to="/login" />
  )
}

export default Profile