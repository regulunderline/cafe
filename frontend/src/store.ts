import { configureStore } from '@reduxjs/toolkit'

import menuItemReducer from './reducers/menuItemReducer.ts'
import filterReducer from './reducers/filterReducer.ts'
import userReducer from './reducers/userReducer.ts'
import usersReducer from './reducers/usersReducer.ts'
import notificationReducer from './reducers/notificationReducer.ts'
import menusReducer from './reducers/menusReducer.ts'
import menuReducer from './reducers/menuReducer.ts'


const store = configureStore({
  reducer: {
  menuItems: menuItemReducer,
  filter: filterReducer,
  user: userReducer,
  users: usersReducer,
  notification: notificationReducer,
  menus: menusReducer,
  menu: menuReducer
}
})
console.log(store.getState())

export type StoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store