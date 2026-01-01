import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { setOneUser } from '../reducers/usersReducer'

import type { ReducerState } from '../types'

const User = () => {
  const id = Number(useParams().id)
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-expect-error will type later
    dispatch(setOneUser(id))
  }, [dispatch, id])

  const user = useSelector((state: ReducerState) => state.users.find(u => u.id === id))
  //const loggedInUser = useSelector((state: ReducerState) => state.user)

  if(!user){
    return <div><strong>something went wrong</strong></div>
  } else {
    return (
      <li key={user.id}>
        <p>name: {user.name}</p>
        <p>username: {user.username}</p>
        {user.admin && <p><strong>admin</strong></p>}
        {user.staff && <p><strong>staff</strong></p>}
      </li>
    )
  }
}

export default User