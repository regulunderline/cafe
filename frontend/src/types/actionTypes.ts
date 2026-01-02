import type { UnknownAction } from "redux"
import type { FilterType, FrontEndUser, MenuItemType, NonSensetiveUser } from "."

export interface NewMenuItemAction extends UnknownAction {
  type: string,
  payload: MenuItemType
}

export interface SetMenuItemsAction extends UnknownAction {
  type: string,
  payload: MenuItemType[]
}

export type MenuItemAction = NewMenuItemAction | SetMenuItemsAction

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