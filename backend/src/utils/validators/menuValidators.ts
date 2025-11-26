import { NewMenuItem, MenuItemEntries } from '../../types'

import { isString, isNumber } from './helpers'

const parseName = (name:unknown): string =>  {
  if(!name || !isString(name) || name.length > 255) {
    throw new Error ('invalid menu item name', { cause : 401 })
  }
  return name
}

const parseIngredients = (ingredients:unknown): string =>  {
  if(!ingredients || !isString(ingredients) || ingredients.length > 255) {
    throw new Error ('invalid menu item ingredients', { cause : 401 })
  }
  return ingredients
}

const parsePrice = (price:unknown): number =>  {
  if(!price || !isNumber(price) || !Number.isInteger(price)) {
    throw new Error ('invalid menu item price', { cause : 401 })
  }
  return price
}

const parseWeight = (weight:unknown): number =>  {
  if(!weight || !isNumber(weight) || !Number.isInteger(weight)) {
    throw new Error ('invalid menu item weight', { cause : 401 })
  }
  return weight
}

export const toNewMenuItem = (object: unknown): NewMenuItem => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data', { cause: 401 });
  }
  if(!('name' in object)){
    throw new Error('menu item name is missing', { cause: 401 })
  }
  if(!('price' in object)){
    throw new Error('menu item price is missing', { cause: 401 })
  }
  if(!('weight' in object)){
    throw new Error('menu item weight is missing', { cause: 401 })
  }

  const newMenuItem: NewMenuItem = {
    name: parseName(object.name),
    price: parsePrice(object.price),
    weight: parseWeight(object.weight),
  }
  if('ingredients' in object){
    newMenuItem.ingredients = parseIngredients(object.ingredients)
  }

  return newMenuItem
}

export const toUpdateMenuItemInfo = (object: unknown): MenuItemEntries => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data', { cause: 401 });
  }
  const newMenuItem: MenuItemEntries = {}
  if('name' in object){
    newMenuItem.name = parseName(object.name)
  }
  if('price' in object){
    newMenuItem.price = parsePrice(object.price)
  }
  if('weight' in object){
    newMenuItem.weight = parseWeight(object.weight)
  }
  if('ingredients' in object){
    newMenuItem.ingredients = parseIngredients(object.ingredients)
  }

  return newMenuItem
}