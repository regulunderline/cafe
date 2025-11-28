import { Model, DataTypes } from 'sequelize'

import { sequelize } from '../utils/db'

interface SessionAttributes {
  id: number
  userId: number
}
class Session extends Model<SessionAttributes, { id?: number, userId: number }> implements SessionAttributes{
  id!:number
  userId!: number
  createdAt!: Date
  updatedAt!: Date
}

Session.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'session'
})

export default Session