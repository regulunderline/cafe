import { createSlice } from "@reduxjs/toolkit"
import type { FilterType, SetFilterAction } from "../types"

const filterSlice = createSlice({
  name: 'menuItems',
  initialState: 'ALL' as FilterType,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filterChange(_state = 'ALL', action: SetFilterAction) {
      return action.payload
    }
  }
})

export const { filterChange } = filterSlice.actions

export default filterSlice.reducer