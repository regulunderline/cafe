import axios from "axios"

import type { MenuItemType, NewMenuItem } from "../types"

const url = 'http://localhost:3001/api/menuItems/'

const getAll = async () => {
  const response = await axios.get(url)
  if(response.status !== 200){
    throw new Error('couldn\'t get Menu Items')
  }

  return response.data as MenuItemType[]
}

const creatNew = async(item: NewMenuItem) => {
  const response = await axios.post(url, { ...item, secret: 1 }, {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZ3VsIiwiaWQiOjMsInNlc3Npb25JZCI6NiwiaWF0IjoxNzY3MTE3ODQ1fQ.vL4QrmfGXwzBjGfatXZu512wBF71fT1gkgkKbc8Eu_c'
    }
  })
  if(response.status !== 200){
    console.log(response)
    throw new Error('couldn\'t get Menu Items', { cause: response.status })
  }

  return response.data as MenuItemType  
}

export default { getAll, creatNew }