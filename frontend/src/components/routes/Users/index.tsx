import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { initializeUsers } from '../../../reducers/usersReducer.ts'

import type { ReducerState } from '../../../types'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-expect-error will type later
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector((state: ReducerState) => state.users)

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link></li>
        ))}
      </ul>
    </div>
  )
}

export default Users