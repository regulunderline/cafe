import { createSlice, type Dispatch } from '@reduxjs/toolkit'

import menuService from '../services/menus.ts'

import type { FullMenuType, MenuUpdateInfo } from "../types"
import type { SetMenuAction } from '../types/actionTypes.ts'

const menuSlice = createSlice({
  name: 'menu',
  initialState: null as FullMenuType | null,
  reducers: {
    setMenu(_state, action: SetMenuAction) {
      return action.payload
    },
  }
})

const { setMenu } = menuSlice.actions

export const setMenuById = (id: number) => {
  return async (dispatch: Dispatch) => {
    const menuItem = await menuService.getOne(id)
    dispatch(setMenu(menuItem))
  }
}

export const setMenuByDate = (date: Date | string) => {
  if(date instanceof Date){
    date = date.toISOString().split('T')[0] as string
  }

  return async (dispatch: Dispatch) => {
    const menuItem = await menuService.getOneByDate(date)
    dispatch(setMenu(menuItem))
  }
}

export const changeMenu = (id: number, token: string, ids: number[] | null = null, idsToDelete: number[] | null = null,) => {
  return async (dispatch: Dispatch) => {
    const updateInfo: MenuUpdateInfo = {}
    if(ids) updateInfo.ids = ids
    if(idsToDelete) updateInfo.idsToDelete = idsToDelete

    try {
      const updatedMenu = await menuService.updateOne(updateInfo, id, token)

      dispatch(setMenu(updatedMenu))
    } catch (e){
      if(e instanceof Error){
        throw e
      } else {
        console.log(e)
      }
    }
  }
}

export default menuSlice.reducer