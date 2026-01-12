import type { SelectHTMLAttributes } from "react"
import { Categories } from "../../types"

const SelectCategory = (props: SelectHTMLAttributes<HTMLSelectElement>) => {
  const otherProps: SelectHTMLAttributes<HTMLSelectElement> = {}
  if(!(props.value || props.defaultValue)){
    otherProps.defaultValue = Categories[0]
  }
  if(!props.name){
    otherProps.name = 'category'
  }

  return (
    <select
      {...props}
      {...otherProps}
    >
      {Categories.map((c, i) => <option key={i} value={c.toLowerCase()}>{c.toLowerCase()}</option>)}
    </select>
  )
}

export default SelectCategory