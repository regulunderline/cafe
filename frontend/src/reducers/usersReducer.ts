import { createSlice, type Dispatch } from '@reduxjs/toolkit'

import usersService from '../services/users.ts'
import type { NewUser, NonSensetiveUser, ReducerState, UserEntries } from "../types"
import type { AddUserAction, changeOneUserAction, SetUsersAction } from '../types/actionTypes.ts'
import { AxiosError } from 'axios'

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as NonSensetiveUser[],
  reducers: {
    setUsers(_state, action: SetUsersAction) {
      return action.payload
    },
    addUser(state: NonSensetiveUser[], action: AddUserAction){
      return state.concat(action.payload)
    },
    changeOneUserReducer(state: NonSensetiveUser[], action: changeOneUserAction){
      

      return state.map(user => user.id === action.payload.id ? action.payload : user)
    },
  }
})

const { setUsers, addUser, changeOneUserReducer } = usersSlice.actions

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
        dispatch(setUsers([user]))
      } catch (e){
        if(e instanceof Error){
          throw e
        }
      }
    }
  }
}

export const changeOneUser = (updateInfo: UserEntries, id: number, token: string) => {
  return async (dispatch: Dispatch, getState: () => ReducerState) => {
    const state = getState()

    const user = state.users.find(u => u.id === id)
    try {
      const updatedUser = await usersService.updateOne(updateInfo, id, token)

      if(user){ 
        dispatch(changeOneUserReducer(updatedUser))
      } else {
        dispatch(addUser(updatedUser))
      }
    } catch (e){
      if(e instanceof Error){
        throw e
      } else {
        console.log(e)
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

export const createOneUser = (newUser: NewUser) => {
  return async (dispatch: Dispatch) => {
    try{
      const user = await usersService.createOne(newUser)
      dispatch(addUser(user))
      return true
    } catch (e) {
      console.log(e)
      if((e instanceof AxiosError) && e.response && e.response.data.error){
        throw new Error(e.response.data.error)
      }
      return false
    }
  }
}

export default usersSlice.reducer