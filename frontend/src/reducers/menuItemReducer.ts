import { createSlice, type Dispatch } from '@reduxjs/toolkit'

import menuItemService from '../services/menuItems.ts'
import type { MenuItemType, } from "../types"
import type { NewMenuItemAction, SetMenuItemsAction } from '../types/actionTypes.ts'

const menuItemSlice = createSlice({
  name: 'menuItems',
  initialState: [] as MenuItemType[],
  reducers: {
    createMenuItem(state: MenuItemType[] = [], action: NewMenuItemAction) {
      state.push(action.payload)
    },
    setMenuItems(_state, action: SetMenuItemsAction) {
      return action.payload
    }
  }
})

const { setMenuItems } = menuItemSlice.actions

export const initializeMenuItems = () => {
  return async (dispatch: Dispatch) => {
    const menuItems = await menuItemService.getAll()
    dispatch(setMenuItems(menuItems))
  }
}

export const { createMenuItem } = menuItemSlice.actions

export default menuItemSlice.reducer