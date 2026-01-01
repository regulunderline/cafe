import { createSlice, type Dispatch } from '@reduxjs/toolkit'

import usersService from '../services/users.ts'
import type { NonSensetiveUser, ReducerState } from "../types"
import type { AddUserAction, SetUsersAction } from '../types/actionTypes.ts'

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as NonSensetiveUser[],
  reducers: {
    setUsers(_state, action: SetUsersAction) {
      return action.payload
    },
    addUser(state: NonSensetiveUser[], action: AddUserAction){
      return state.concat(action.payload)
    }
  }
})

const { setUsers, addUser } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch: Dispatch) => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export const setOneUser = (id: number) => {
  return async (dispatch: Dispatch, getState: () => ReducerState) => {
    const state = getState()
    const user = state.users.find(u => u.id === id)
    if (user) {
      dispatch(setUsers([user]))
    } else {
      try {
        const user = await usersService.getOne(id)
        dispatch(addUser(user))
      } catch (e){
        if(e instanceof Error){
          throw e
        }
      }
    }
  }
}

export const addOneUser = (id: number) => {
  return async (dispatch: Dispatch) => {
    const user = await usersService.getOne(id)
    dispatch(addUser(user))
  }
}

export default usersSlice.reducer