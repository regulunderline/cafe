import { Model, DataTypes, Optional } from 'sequelize'

import { sequelize } from '../utils/db'

import { UserType } from '../types'

type UserAttributes = Optional<UserType, 'id'>

class User extends Model<UserType, UserAttributes> implements UserType{
  id!: number
  username!: string
  password!: string
  name!: string
  staff!: boolean
  admin!: boolean
  disabled!: boolean
  created_at!: Date
  updated_at!: Date
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
    validate: {
      is: {
        args: /^[a-z0-9_]{3,31}$/i,
        msg: 'username must be 3 to 31 characters long and only contain letters, numbers and underscores'
      }
    }
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      is: {
        args: /^[a-z0-9_]{3,31}$/i,
        msg: 'name must be 3 to 31 characters long and only contain letters, numbers and underscores'
      }
    }
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  staff: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user'
})

export default User