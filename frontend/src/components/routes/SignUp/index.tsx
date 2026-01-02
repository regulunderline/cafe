import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

import type { ReducerState } from "../../../types"
import SignUpForm from "./SignUpForm.tsx"


const SignUp = () => {
  const user = useSelector((state: ReducerState) => state.user)

  return user 
    ? <Navigate replace to="/" />
    : <>
      <h2>Sign Up</h2>
      <SignUpForm />
    </>
}

export default SignUp