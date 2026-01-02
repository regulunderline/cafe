import axios, { AxiosError } from "axios"

import type { NonSensetiveUser, UserEntries } from "../types"

const url = 'http://localhost:3001/api/users/'

const getAll = async () => {
  const response = await axios.get(url)
  if(response.status !== 200){
    throw new Error('couldn\'t get users')
  }

  return response.data as NonSensetiveUser[]
}

const getOne = async (id: number) => {
  try {
    const response = await axios.get(`${url}${id}`)

    return response.data as NonSensetiveUser
  } catch (e) {
    if((e instanceof AxiosError) && e.status === 404){
      throw new Error('not found', { cause: 404 })
    }
    throw new Error('couldn\'t get user')
  }
}

const updateOne = async (updateInfo: UserEntries, id: number, token: string) => {
  const response = await axios.put(`${url}${id}`, updateInfo, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if(response.status !== 200){
    throw new Error('couldn\'t update Menu Item')
  }

  return response.data as NonSensetiveUser
}

export default { getAll, getOne, updateOne }