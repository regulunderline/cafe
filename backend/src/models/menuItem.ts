import { Model, DataTypes, Optional } from 'sequelize'

import { sequelize } from '../utils/db'

import { MenuItemType } from '../types'

type MenuItemAttributes = Optional<MenuItemType, 'id'>

class MenuItem extends Model<MenuItemType, MenuItemAttributes> implements MenuItemType {
  id!: number
  name!: string
  price!: number
  weight!: number
  ingredients?: string[]
  createdAt!: Date
  updatedAt!: Date
}

MenuItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
    validate: {
      is: /^[a-z0-9_ ]{3,31}$/i
    }
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'menuItem'
})

export default MenuItem