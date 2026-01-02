import { useEffect, type MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { changeOneUser, setOneUser } from '../../../reducers/usersReducer'

import type { UnknownAction } from 'redux'
import type { ReducerState } from '../../../types'
import CafeButton from '../../utils/CafeButton'

const User = () => {
  const id = Number(useParams().id)
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-expect-error will type later
    dispatch(setOneUser(id))
  }, [dispatch, id])

  const user = useSelector((state: ReducerState) => state.users.find(u => u.id === id))
  const loggedInUser = useSelector((state: ReducerState) => state.user)

  if(!user){
    return <div><strong>something went wrong</strong></div>
  } else {

    const handleDisable = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      dispatch(changeOneUser({ disabled: true }, user.id, loggedInUser.token) as unknown as UnknownAction)
    }

    const handleEnable = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      dispatch(changeOneUser({ disabled: false }, user.id, loggedInUser.token) as unknown as UnknownAction)
    }
    
    return (
      <div>
        <p>name: {user.name}</p>
        <p>username: {user.username}</p>

        {user.admin && <p><strong>admin</strong></p>}
        {user.staff && <p><strong>staff</strong></p>}

        {(loggedInUser && loggedInUser.admin && user.disabled)
          && <CafeButton text="enable" onClick={handleEnable} />}
        {(loggedInUser && loggedInUser.admin && !user.disabled)
          && <CafeButton text="disable" onClick={handleDisable} />}
      </div>
    )
  }
}

export default User