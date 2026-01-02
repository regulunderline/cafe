import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

import type { ReducerState } from "../../../types"
import LoginForm from "./LoginForm"

const Login = () => {
  const user = useSelector((state: ReducerState) => state.user)

  return user 
    ? <Navigate replace to="/" />
    : <>
      <h2>Login</h2>
      <LoginForm />
    </>
}

export default Login