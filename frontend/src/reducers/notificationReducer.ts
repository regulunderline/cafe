import { createSlice, type Dispatch } from '@reduxjs/toolkit'

import type { SetNotificationAction } from '../types/actionTypes'
import type { Notification } from '../types'
import type { StoreState } from '../store'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { id: 0, type: 'success' } as Notification,
  reducers: {
    setNotification(state, action: SetNotificationAction) {
      const id = state.id + 1
      if (!action.payload){
        return { ...state, message: null, id }
      }

      return { ...state, ...action.payload, id }
    }
  }
})

export const { setNotification } = notificationSlice.actions

export const newNotification = (message: string, type: string, timeout: number) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    dispatch(setNotification({ message, type }))

    const state = getState()

    setTimeout(() => {
      const newState = getState()

      if (state.notification.id === newState.notification.id)
        dispatch(setNotification(null))
    }, timeout*1000)
  }
}

export default notificationSlice.reducer