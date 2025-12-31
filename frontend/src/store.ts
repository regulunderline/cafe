import { configureStore } from '@reduxjs/toolkit'

import menuItemReducer from './reducers/menuItemReducer.ts'
import filterReducer from './reducers/filterReducer.ts'

const store = configureStore({
  reducer: {
  menuItems: menuItemReducer,
  filter: filterReducer
}
})
console.log(store.getState())

export default store