import { createSlice, type Dispatch } from '@reduxjs/toolkit'

import menuService from '../services/menus.ts'

import type { MenuType } from "../types"
import type { NewMenuAction, RemoveMenuAction, SetMenusAction } from '../types/actionTypes.ts'
import type { StoreState } from '../store.ts'

const menusSlice = createSlice({
  name: 'menus',
  initialState: [] as MenuType[],
  reducers: {
    addMenu(state: MenuType[] = [], action: NewMenuAction) {
      state.push(action.payload)
    },
    setMenus(_state, action: SetMenusAction) {
      return action.payload
    },
    removeMenu(state, action: RemoveMenuAction) {
      return state.filter(i => i.id !== action.payload)
    },
  }
})

const { setMenus, addMenu, removeMenu } = menusSlice.actions

export const initializeMenus = () => {
  return async (dispatch: Dispatch) => {
    const menuItems = await menuService.getAll()
    dispatch(setMenus(menuItems))
  }
}

export const createMenu = (token: string, date: Date | string, ids: number[] | null = null) => {
  if(date instanceof Date){
    date = date.toISOString().split('T')[0] as string
  }

  return async (dispatch: Dispatch) => {
    try {
      const addedMenu = await menuService.creatNew(date, token, ids)

      dispatch(addMenu(addedMenu))
    } catch (e){
      if(e instanceof Error){
        throw e
      } else {
        console.log(e)
      }
    }
  }
}

export const deleteOneMenu = (id: number, token: string) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    const state = getState()

    const menuItem = state.menuItems.find(i => i.id === id)
    try {
      const success = await menuService.deleteOne(id, token)

      if(menuItem && success){ 
        dispatch(removeMenu(id))
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

export default menusSlice.reducer