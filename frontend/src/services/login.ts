import axios from 'axios'

import type { FrontEndUser, LoginInfo, } from '../types'

const url = 'http://localhost:3001/api/login/'

const login = async (credentials: LoginInfo) => {
  const response = await axios.post(url, credentials)
  return response.data as FrontEndUser
}

export default { login }