import type { UnknownAction } from "redux"
import type { FilterType, FrontEndUser, FullMenuType, MenuItemType, MenuType, NonSensetiveUser, Notification } from "."

export interface NewMenuItemAction extends UnknownAction {
  type: string,
  payload: MenuItemType
}

export interface SetMenuItemsAction extends UnknownAction {
  type: string,
  payload: MenuItemType[]
}

export interface RemoveMenuItemAction extends UnknownAction {
  type: string,
  payload: number
}

export interface ChangeOneMenuItemAction extends UnknownAction {
  type: string,
  payload: MenuItemType
}

export type MenuItemAction = NewMenuItemAction | SetMenuItemsAction | ChangeOneMenuItemAction | RemoveMenuItemAction


export interface NewMenuAction extends UnknownAction {
  type: string,
  payload: MenuType
}

export interface SetMenusAction extends UnknownAction {
  type: string,
  payload: MenuType[]
}

export interface RemoveMenuAction extends UnknownAction {
  type: string,
  payload: number
}

export interface SetMenuAction extends UnknownAction {
  type: string,
  payload: FullMenuType | null
}


export interface SetLoggedInUserAction extends UnknownAction {
  type: string,
  payload: FrontEndUser
}

export interface SetUsersAction extends UnknownAction {
  type: string,
  payload: NonSensetiveUser[]
}

export interface AddUserAction extends UnknownAction {
  type: string,
  payload: NonSensetiveUser
}

export interface changeOneUserAction extends UnknownAction {
  type: string,
  payload: NonSensetiveUser
}

export interface SetFilterAction extends UnknownAction {
  type: string,
  payload: FilterType
}

export type FilterAction = SetFilterAction

export interface SetNotificationAction extends UnknownAction {
  type: string,
  payload: Omit<Notification, 'id'> | null
}