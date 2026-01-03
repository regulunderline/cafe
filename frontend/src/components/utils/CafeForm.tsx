import type { FormHTMLAttributes } from "react"

const CafeForm = (props: FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form {...props} />
  )
}

export default CafeForm