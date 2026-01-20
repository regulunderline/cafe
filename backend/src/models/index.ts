import MenuItem from './menuItem'
import User from './user'
import Session from './session'
import Menu from './menu'
import MenusMenuItems from './menus_menuItems'

User.hasMany(Session)
Session.belongsTo(User)

Menu.belongsToMany(MenuItem, { through: MenusMenuItems, as: 'menuItems' })
MenuItem.belongsToMany(Menu, { through: MenusMenuItems, as: 'menusIn' })

export { MenuItem }
export { User }
export { Menu }
export { MenusMenuItems }