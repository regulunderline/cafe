import { createSlice } from "@reduxjs/toolkit"
import type { FrontEndUser } from "../types"
import type { SetLoggedInUserAction } from "../types/actionTypes"

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

export default userSlice.reducer