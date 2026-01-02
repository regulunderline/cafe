import { createSlice, type Dispatch } from '@reduxjs/toolkit'

import type { SetNotificationAction } from '../types/actionTypes'
import type { Notification } from '../types'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null as null | Notification,
  reducers: {
    setNotification(_state, action: SetNotificationAction) {
      return action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions

export const newNotification = (message: string, type: string, timeout: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => dispatch(setNotification(null)), timeout*1000)
  }
}

export default notificationSlice.reducer