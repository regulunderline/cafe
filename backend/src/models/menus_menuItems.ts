import { Model, DataTypes } from 'sequelize'

import { sequelize } from '../utils/db'

class MenusMenuItems extends Model<{ id: number, menuId: number, menuItemId: number }, { id?: number, menuId: number, menuItemId: number }>{
  id!: number
  menuId!: number
  menuItemId!: number
}

MenusMenuItems.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'menus', key: 'id' },
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'menu_items', key: 'id' },
  },
}, {
  sequelize,
  underscored: true,
  timestamps:false,
  modelName: 'menus_menu_items'
})

export default MenusMenuItems