import axios from "axios"

import type { FullMenuType, MenuType, MenuUpdateInfo } from "../types"

const url = 'http://localhost:3001/api/menus/'

const getAll = async () => {
  const response = await axios.get(url)
  if(response.status !== 200){
    throw new Error('couldn\'t get Menus')
  }

  return response.data as MenuType[]
}

const getOne = async (id: number) => {
  const response = await axios.get(`${url}${id}`)
  if(response.status !== 200){
    throw new Error('couldn\'t get Menu')
  }

  return response.data as FullMenuType
}

const getOneByDate = async (date: string) => {
  const response = await axios.get(`${url}search?date=${date}`)
  if(response.status !== 200){
    throw new Error('couldn\'t get Menu')
  }

  return response.data as FullMenuType
}

const creatNew = async(date: string, token: string, ids: number[] | null = null) => {
  const body: { date: string, ids?: number[] } = { date }
  if(ids) body.ids = ids

  const response = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if(response.status !== 200){
    console.log(response)
    throw new Error('couldn\'t get Menu Items', { cause: response.status })
  }

  return response.data as FullMenuType  
}

const updateOne = async (updateInfo: MenuUpdateInfo, id: number, token: string) => {
  const response = await axios.put(`${url}${id}`, updateInfo, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if(response.status !== 200){
    throw new Error('couldn\'t update Menu')
  }

  return response.data as FullMenuType
}

const deleteOne = async (id: number, token: string) => {
  const response = await axios.delete(`${url}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if(response.status !== 204){
    throw new Error('couldn\'t delete Menu')
  }

  return true
}

export default { getAll, getOne, getOneByDate, creatNew, updateOne, deleteOne }