import { configureStore } from '@reduxjs/toolkit'

import menuItemReducer from './reducers/menuItemReducer.ts'
import filterReducer from './reducers/filterReducer.ts'
import userReducer from './reducers/userReducer.ts'
import usersReducer from './reducers/usersReducer.ts'
import notificationReducer from './reducers/notificationReducer.ts'

const store = configureStore({
  reducer: {
  menuItems: menuItemReducer,
  filter: filterReducer,
  user: userReducer,
  users: usersReducer,
  notification: notificationReducer
}
})
console.log(store.getState())

export default store