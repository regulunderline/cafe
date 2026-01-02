import { createSlice, type Dispatch } from "@reduxjs/toolkit"

import loginService from '../services/login.ts'

import type { FrontEndUser, LoginInfo } from "../types"
import type { SetLoggedInUserAction } from "../types/actionTypes"
import { AxiosError } from "axios"

const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('loggedCafeUser') ? JSON.parse(localStorage.getItem('loggedCafeUser') as string) : null as FrontEndUser | null,
  reducers: {
    setUser(_state, action: SetLoggedInUserAction) {
      window.localStorage.setItem(
        'loggedCafeUser', JSON.stringify(action.payload)
      )

      return action.payload
    },

    LogOut() {
      window.localStorage.removeItem(
        'loggedCafeUser'
      )

      return null
    }
  }
})

export const { setUser, LogOut } = userSlice.actions

export const logIn = (credentials: LoginInfo) => {
  return async (dispatch: Dispatch) => {
    try{
      const user = await loginService.login(credentials)
      dispatch(setUser(user))
      return user
    } catch (e) {
      console.log(e)
      if((e instanceof AxiosError) && e.response && e.response.data.error){
        throw new Error(e.response.data.error)
      }
      return false
    }
  }
}

export default userSlice.reducer