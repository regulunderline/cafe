import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('menu_items', 'ingredients')
  await queryInterface.addColumn('menu_items', 'ingredients', {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true
  })
}
export const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('menu_items', 'ingredients')
  await queryInterface.addColumn('menu_items', 'ingredients', {
    type: DataTypes.TEXT,
    allowNull: true
  })
}