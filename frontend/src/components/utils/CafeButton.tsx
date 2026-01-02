import type{ ButtonHTMLAttributes, RefAttributes } from "react"

const CafeButton = ({ text, ...props }: RefAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement> & { text: string }) => {
  return (
    <button {...props}>
      {text}
    </button>
  )
}

export default CafeButton