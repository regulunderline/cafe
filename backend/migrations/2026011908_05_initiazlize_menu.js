import { DataTypes } from 'sequelize'

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable(
    'menus', 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: DataTypes.DATEONLY,
        unique: true,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      timestamps: true,
    }
  )
  await queryInterface.createTable(
    'menus_menu_items', 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'menus', key: 'id' },
      },
      menu_item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'menu_items', key: 'id' },
      },
    }
  )
}
export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('menus_menu_items')
  await queryInterface.dropTable('menus')
}