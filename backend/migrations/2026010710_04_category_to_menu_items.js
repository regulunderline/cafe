import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('menu_items', 'category', {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'other'
  })
}
export const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('menu_items', 'category')
}