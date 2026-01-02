import type { InputHTMLAttributes, RefAttributes } from "react"

const CafeInput = (props: InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>) => {
  return (
    <input {...props} />
  )
}

export default CafeInput