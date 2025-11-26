import { Model, DataTypes } from 'sequelize'

import { sequelize } from '../utils/db'

class User extends Model {}

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
    validate: {
      is: { args: /^.{3,31}$/i, msg: 'password must be 3 to 31 characters long' }
    }
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
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user'
})

export default User