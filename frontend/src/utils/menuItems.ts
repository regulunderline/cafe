import { Categories, type MenuItemType } from "../types";

export const toOtherCategory = (menuItem: MenuItemType): MenuItemType => 
  Categories.some(c => c === menuItem.category.toUpperCase())
    ? menuItem
    : { ...menuItem, category: 'OTHER' }