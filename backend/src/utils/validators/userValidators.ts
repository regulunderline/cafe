import { NewUser, UserEntries } from '../../types'

import { isString } from './helpers'

const parseName = (name:unknown): string =>  {
  if(!name || !isString(name) || name.length > 31) {
    throw new Error ('invalid name', { cause : 401 })
  }
  return name
}

const parseUsername = (username:unknown): string =>  {
  if(!username || !isString(username) || username.length > 15) {
    throw new Error ('invalid username', { cause : 401 })
  }
  return username
}

const parsePassword = (password:unknown): string =>  {
  if(!password || !isString(password) || password.length > 31) {
    throw new Error ('invalid password', { cause : 401 })
  }
  return password
}

const parseSecret = (secret:unknown): string =>  {
  if(!secret || !isString(secret) || secret.length > 31) {
    throw new Error ('invalid secret value', { cause : 401 })
  }
  return secret
}

export const toNewUser = (object: unknown): NewUser => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data', { cause: 401 });
  }
  if(!('username' in object)){
    throw new Error('username is missing', { cause: 401 })
  }
  if(!('name' in object)){
    throw new Error('name is missing', { cause: 401 })
  }
  if(!('password' in object)){
    throw new Error('password is missing', { cause: 401 })
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
    throw new Error('Incorrect or missing data', { cause: 401 });
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