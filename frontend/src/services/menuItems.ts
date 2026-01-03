import axios from "axios"

import type { MenuItemEntries, MenuItemType, NewMenuItem } from "../types"

const url = 'http://localhost:3001/api/menuItems/'

const getAll = async () => {
  const response = await axios.get(url)
  if(response.status !== 200){
    throw new Error('couldn\'t get Menu Items')
  }

  return response.data as MenuItemType[]
}

const getOne = async (id: number) => {
  const response = await axios.get(`${url}${id}`)
  if(response.status !== 200){
    throw new Error('couldn\'t get Menu Items')
  }

  return response.data as MenuItemType
}

const creatNew = async(item: NewMenuItem, token: string) => {
  const response = await axios.post(url, { ...item }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if(response.status !== 200){
    console.log(response)
    throw new Error('couldn\'t get Menu Items', { cause: response.status })
  }

  return response.data as MenuItemType  
}

const updateOne = async (updateInfo: MenuItemEntries, id: number, token: string) => {
  const response = await axios.put(`${url}${id}`, updateInfo, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if(response.status !== 200){
    throw new Error('couldn\'t update Menu Item')
  }

  return response.data as MenuItemType
}

const deleteOne = async (id: number, token: string) => {
  const response = await axios.delete(`${url}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if(response.status !== 204){
    throw new Error('couldn\'t delete Menu Item')
  }

  return true
}

export default { getAll, getOne, creatNew, updateOne, deleteOne }