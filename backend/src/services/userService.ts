import usersData from '../../data/users.json'

import { ADMIN_SECRET, STUFF_SECRET } from '../utils/config'

import { NewUser, NonSensetiveUser, User, UserEntries } from '../types'

const users: User[] = usersData.map(u => {
  return { 
    ...u, 
    created_at: new Date(u.created_at), 
    updated_at: new Date(u.updated_at), 
  }
})

const getAll = (): User[] => {
  return users
}

const getAllNonSensetive = (): NonSensetiveUser[] => {
  return users.map(({ id, name, username, staff, admin, created_at, updated_at }) => {
    return { id, name, username, staff, admin, created_at, updated_at }
  })
}

const findById = (id: number): User | undefined => {
  return users.find(u => u.id === id)
}

const findByIdNonSensative = (idToFind: number): NonSensetiveUser | undefined => {
  const user =  users.find(u => u.id === idToFind)
  if(!user){
    return undefined
  }
  const { id, name, username, staff, admin, created_at, updated_at } = user
  return { id, name, username, staff, admin, created_at, updated_at }
}


const verifyAdminSecret = (secret: unknown): boolean => {
  if(secret !== ADMIN_SECRET){
    throw new Error('incorrect secret admin value', { cause: 401 })
  }
  return true
}
const verifyStaffSecret = (secret: unknown): boolean => {
  if(secret !== ADMIN_SECRET && secret !== STUFF_SECRET){
    throw new Error('incorrect secret staff value', { cause: 401 })
  }
  return true
}

const addOne = (newUser: NewUser): NonSensetiveUser => {
  const userToAdd: User = {
    id: Math.max(...users.map(u => u.id)) + 1,
    name: newUser.name, 
    password: newUser.password,
    username: newUser.username,
    staff: newUser.staff === true ? verifyStaffSecret(newUser.secret) : false,
    admin: newUser.admin === true ? verifyAdminSecret(newUser.secret) : false,
    created_at: new Date(),
    updated_at: new Date() 
  }

  users.push(userToAdd)

  const { id, name, username, staff, admin, created_at, updated_at } = userToAdd 
  return { id, name, username, staff, admin, created_at, updated_at }
}

const updateOne = ({ secret, ...updateInfo }: UserEntries, idToUpdate: number): NonSensetiveUser => {
  const userToUpdate = users.find(i => i.id === idToUpdate)
  if(!userToUpdate){
    throw new Error('user not found', { cause: 404 })
  }
  if ('staff' in updateInfo) {
    verifyStaffSecret(secret)
  }
  if ('admin' in updateInfo) {
    verifyAdminSecret(secret)
  }

  const updatedUser = { ...userToUpdate, ...updateInfo, updated_at: new Date }

  users.forEach((user, index) => {
    if(user.id === idToUpdate) {
      users[index] = updatedUser
      return
    }
  })

  const { id, name, username, staff, admin, created_at, updated_at } = updatedUser
  return { id, name, username, staff, admin, created_at, updated_at }
} 

export default {
  getAll,
  getAllNonSensetive,
  findById,
  findByIdNonSensative,
  addOne,
  updateOne
}