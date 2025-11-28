import { NewUser, UserEntries, UserTokenInfo } from '../../types'

import { isString } from './helpers'

const parseId = (id:unknown): number =>  {
  if(!id || !(typeof id === 'number')) {
    throw new Error ('invalid id', { cause : 400 })
  }
  return id
}

const parseName = (name:unknown): string =>  {
  if(!name || !isString(name) || name.length > 31) {
    throw new Error ('invalid name', { cause : 400 })
  }
  return name
}

export const parseUsername = (username:unknown): string =>  {
  if(!username || !isString(username) || username.length > 15) {
    throw new Error ('invalid username', { cause : 400 })
  }
  return username
}

export const parsePassword = (password:unknown): string =>  {
  if(!password || !isString(password) || password.length > 31 || password.length < 3) {
    throw new Error ('invalid password', { cause : 400 })
  }
  return password
}

const parseSecret = (secret:unknown): string =>  {
  if(!secret || !isString(secret) || secret.length > 31) {
    throw new Error ('invalid secret value', { cause : 400 })
  }
  return secret
}

export const toNewUser = (object: unknown): NewUser => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data', { cause: 400 });
  }
  if(!('username' in object)){
    throw new Error('username is missing', { cause: 400 })
  }
  if(!('name' in object)){
    throw new Error('name is missing', { cause: 400 })
  }
  if(!('password' in object)){
    throw new Error('password is missing', { cause: 400 })
  }

  const newUser: NewUser = {
    username: parseUsername(object.username),
    password: parsePassword(object.password),
    name: parseName(object.name),
  }
  if('staff' in object && (typeof object.staff === 'boolean')){
    newUser.staff = object.staff
  }
  if('admin' in object && (typeof object.admin === 'boolean')){
    newUser.admin = object.admin
  }
  if('secret' in object){
    newUser.secret = parseSecret(object.secret)
  }

  return newUser
}

export const toUpdateUserInfo = (object: unknown): UserEntries => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data', { cause: 400 });
  }
  const userEntries: UserEntries = {}
  if('name' in object){
    userEntries.name = parseName(object.name)
  }
  if('password' in object){
    userEntries.password = parsePassword(object.password)
  }
  if('staff' in object && (typeof object.staff === 'boolean')){
    userEntries.staff = object.staff
  }
  if('admin' in object && (typeof object.admin === 'boolean')){
    userEntries.admin = object.admin
  }
  if('secret' in object){
    userEntries.secret = parseSecret(object.secret)
  }

  return userEntries
}

export const toUserTokenInfo = (object: unknown): UserTokenInfo => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data', { cause: 401 });
  }

  if(!('username' in object)){
    throw new Error('invalid token', { cause: 401 })
  }
  if(!('id' in object)){
    throw new Error('invalid token', { cause: 401 })
  }

  const userEntries: UserTokenInfo = {
    username: parseUsername(object.username),
    id: parseId(object.id),
  }
  return userEntries
}