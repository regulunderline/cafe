import { Model, DataTypes } from 'sequelize'

import { sequelize } from '../utils/db'

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
const yesterdayISO = yesterday.toISOString().split('T')[0] as string

class Menu extends Model<{ id: number, date : Date }, { id?: number, date: Date }> {
  id!: number
  date!: Date
  createdAt!: Date
  updatedAt!: Date
}

Menu.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATEONLY,
    unique: true,
    allowNull: false,
    validate: {
      isAfter: {
        args: yesterdayISO,
        msg: 'can\'t add past menus'
      }
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'menu'
})

export default Menu