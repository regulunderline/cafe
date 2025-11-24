export interface MenuItem {
  id: number
  name: string
  price: number
  weight: number
  created_at: Date
  updated_at: Date
  ingredients?: string
}

export type NewMenuItem = {
  name: string
  price: number
  weight: number
  ingredients?: string
}

export interface MenuItemEntries {
  id?: number
  name?: string
  price?: number
  weight?: number
  created_at?: Date
  updated_at?: Date
  ingredients?: string
}