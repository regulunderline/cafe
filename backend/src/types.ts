export interface MenuItemType {
  id: number
  name: string
  price: number
  weight: number
  ingredients?: string
}

export interface NewMenuItem {
  name: string
  price: number
  weight: number
  ingredients?: string
}

export interface MenuItemEntries {
  name?: string
  price?: number
  weight?: number
  ingredients?: string
}

export interface UserType {
  id: number
  username: string
  password: string
  name: string
  staff: boolean
  admin: boolean
}

export interface UserFields {
  id: number
  username: string
  password: string
  name: string
  staff: boolean
  admin: boolean
  created_at: Date
  updated_at: Date
}

export type NonSensetiveUser = Omit<UserFields, 'password'>

export interface NewUser {
  username: string
  password: string
  name: string
  staff?: boolean
  admin?: boolean
  secret?: string
}

export interface UserEntries {
  password?: string
  name?: string
  staff?: boolean
  admin?: boolean
  secret?: string
}