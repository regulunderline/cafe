export const Categories = ['MAIN', 'SIDE', 'DRINK', 'SALAD', 'OTHER'] as const

export interface MenuItemType {
  id: number
  name: string
  price: number
  weight: number
  category: typeof Categories[number]
  ingredients?: string[]
}

export type NewMenuItem = Omit<MenuItemType, 'id'>

export type MenuItemEntries = Partial<NewMenuItem>

export interface MenuType {
  id: number
  date: string
  createdAt?: string
  updatedAt?: string
}

export interface MenuUpdateInfo {
  ids?: number[]
  idsToDelete?: number[]
}

export type FullMenuType = MenuType & { menuItems: MenuItemType[] }

export interface UserType {
  id: number
  username: string
  password: string
  name: string
  staff: boolean
  admin: boolean
  disabled: boolean
}

export interface UserFields {
  id: number
  username: string
  password: string
  name: string
  staff: boolean
  admin: boolean
  disabled: boolean
  created_at: Date
  updated_at: Date
}

export type NonSensetiveUser = Omit<UserFields, 'password'>
export type FrontEndUser = NonSensetiveUser & { token: string }

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
  disabled?: boolean
}

export interface UserTokenInfo {
  username: string
  id: number
  sessionId?: number
}

export interface LoginInfo {
  username: string,
  password: string
}

export type FilterType = typeof Categories[number] | 'ALL'

export interface Notification {
  message: string | null,
  type: string,
  id: number
}