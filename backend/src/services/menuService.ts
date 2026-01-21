import { Menu, MenuItem } from '../models/'

const getMenus = async (): Promise<Menu[]> => {
  const menusFound = await Menu.findAll({})
  return menusFound
}

const findById = async (id: number): Promise<Menu | null> => {
  const menu = await Menu.findByPk(id, {
    include: {
      model: MenuItem,
      as: 'menuItems',
      through: { attributes: [] }
    }
  })
  return menu
}

const findByDate = async (date: string): Promise<Menu | null> => {
  const menu = await Menu.findOne({
    where: {
      date
    },
    include: {
      model: MenuItem,
      as: 'menuItems',
      through: { attributes: [] }
    }
  })
  return menu
}

const addMenu = async (date: Date): Promise<Menu> => {
  const menu = await Menu.create({ date })
  return menu
}

const deleteMenu = async (id: number) => {
  const MenuToDelete = await Menu.findByPk(id)
  if(!MenuToDelete){
    throw new Error('menu not found', { cause: 404 })
  }
  await MenuToDelete.destroy()
}

export default {
  getMenus,
  findById,
  findByDate,
  addMenu,
  deleteMenu
}