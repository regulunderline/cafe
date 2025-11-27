// import usersData from '../../data/users.json'

import { ADMIN_SECRET, STUFF_SECRET } from '../utils/config'

import { NewUser, NonSensetiveUser, UserEntries } from '../types'

import { User } from '../models'

// const users: User[] = usersData.map(u => {
//   return { 
//     ...u, 
//     created_at: new Date(u.created_at), 
//     updated_at: new Date(u.updated_at), 
//   }
// })

const getAll = async(): Promise<User[]> => {
  const users = await User.findAll()
  return users
}

const getAllNonSensetive = async (): Promise<NonSensetiveUser[]> => {
  const users = await User.findAll({attributes: {
    exclude: ['password']
  }})
  return users
}

const findById = async (id: number): Promise<User | null> => {
  const user = await User.findByPk(id)
  return user
}

const findByIdNonSensative = async (id: number): Promise<NonSensetiveUser | null> => {
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ['password']
    }
  })
  return user
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

const addOne = async (newUser: NewUser): Promise<NonSensetiveUser> => {
  const userToAdd = {
    ...newUser,
    staff: newUser.staff === true ? verifyStaffSecret(newUser.secret) : false,
    admin: newUser.admin === true ? verifyAdminSecret(newUser.secret) : false
  }
  const { id, name, username, staff, admin, created_at, updated_at } = await User.create(userToAdd)
  return { id, name, username, staff, admin, created_at, updated_at }
}

const updateOne = async ({ secret, ...updateInfo }: UserEntries, idToUpdate: number): Promise<NonSensetiveUser> => {
  const userToUpdate = await User.findByPk(idToUpdate)
  if(!userToUpdate){
    throw new Error('user not found', { cause: 404 })
  }
  if ('staff' in updateInfo) {
    verifyStaffSecret(secret)
  }
  if ('admin' in updateInfo) {
    verifyAdminSecret(secret)
  }

  const { id, name, username, staff, admin, created_at, updated_at } = await userToUpdate.update({...updateInfo}, {
    
  })

  return { id, name, username, staff, admin, created_at, updated_at }
}

const deleteOne = async (id: number) => {
  const userToDelete = await User.findByPk(id)
  console.log(userToDelete)
  if(!userToDelete){
    throw new Error('user not found', { cause: 404 })
  }
  await userToDelete.destroy()
}

export default {
  getAll,
  getAllNonSensetive,
  findById,
  findByIdNonSensative,
  addOne,
  updateOne,
  deleteOne
}