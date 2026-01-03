import { createSlice, type Dispatch } from '@reduxjs/toolkit'

import menuItemService from '../services/menuItems.ts'
import type { MenuItemEntries, MenuItemType, NewMenuItem, } from "../types"
import type { ChangeOneMenuItemAction, NewMenuItemAction, RemoveMenuItemAction, SetMenuItemsAction } from '../types/actionTypes.ts'
import type { StoreState } from '../store.ts'

const menuItemSlice = createSlice({
  name: 'menuItems',
  initialState: [] as MenuItemType[],
  reducers: {
    addMenuItem(state: MenuItemType[] = [], action: NewMenuItemAction) {
      state.push(action.payload)
    },
    setMenuItems(_state, action: SetMenuItemsAction) {
      return action.payload
    },
    removeMenuItem(state, action: RemoveMenuItemAction) {
      return state.filter(i => i.id !== action.payload)
    },
    changeOneMenuItemReducer(state, action: ChangeOneMenuItemAction){
      return state.map(item => item.id === action.payload.id ? action.payload : item)
    },
  }
})

const { setMenuItems, changeOneMenuItemReducer, addMenuItem, removeMenuItem } = menuItemSlice.actions

export const initializeMenuItems = () => {
  return async (dispatch: Dispatch) => {
    const menuItems = await menuItemService.getAll()
    dispatch(setMenuItems(menuItems))
  }
}

export const setOneMenuItem = (id: number) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    const state = getState()
    const menuItem = state.menuItems.find(i => i.id === id)
    if (menuItem) {
      dispatch(setMenuItems([menuItem]))
    } else {
      try {
        const menuItem = await menuItemService.getOne(id)
        dispatch(setMenuItems([menuItem]))
      } catch (e){
        if(e instanceof Error){
          throw e
        }
      }
    }
  }
}

export const changeOneMenuItem = (updateInfo: MenuItemEntries, id: number, token: string) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    const state = getState()

    const menuItem = state.menuItems.find(i => i.id === id)
    try {
      const updatedMenuItem = await menuItemService.updateOne(updateInfo, id, token)

      if(menuItem){ 
        dispatch(changeOneMenuItemReducer(updatedMenuItem))
      } else {
        dispatch(addMenuItem(updatedMenuItem))
      }

      if(updatedMenuItem){
        return true
      } else {
        throw new Error('Something went wrong')
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

export const createMenuItem = (newMenuItem: NewMenuItem, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const addedMenuItem = await menuItemService.creatNew(newMenuItem, token)

      if(addedMenuItem){ 
        dispatch(addMenuItem(addedMenuItem))
        return addedMenuItem
      } else {
        throw new Error('Something went wrong')
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

export const deleteOneMenuItem = (id: number, token: string) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    const state = getState()

    const menuItem = state.menuItems.find(i => i.id === id)
    try {
      const success = await menuItemService.deleteOne(id, token)

      if(menuItem && success){ 
        dispatch(removeMenuItem(id))
      } else {
        throw new Error('Something went wrong')
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

export default menuItemSlice.reducer