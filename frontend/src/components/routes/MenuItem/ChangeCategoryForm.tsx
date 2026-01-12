import { useState, type FormHTMLAttributes, type FormEvent } from "react"
import { useDispatch } from 'react-redux'

import { changeOneMenuItem } from '../../../reducers/menuItemReducer'

import CafeForm from '../../utils/CafeForm'
import type { UnknownAction } from "@reduxjs/toolkit"
import { newNotification } from "../../../reducers/notificationReducer"
import { Categories, type MenuItemType } from "../../../types"
import CafeButton from "../../utils/CafeButton"
import SelectCategory from "../../utils/SelectCategory"

const ChangeForm = ({ menuItem, token, ...props }: 
  { buttonText?: string, menuItem: MenuItemType, token: string } & FormHTMLAttributes<HTMLFormElement>
) => {
  const [value, setValue] = useState('main')

  const dispatch = useDispatch()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try{
      const success = await dispatch(changeOneMenuItem(
        { category: value as typeof Categories[number] },
        menuItem.id,
        token
      ) as unknown as UnknownAction)

      if(success){
        dispatch(newNotification('changed category successfully', 'success', 5) as unknown as UnknownAction)
        setValue('main')
        return
      } else {
        throw new Error('something went wrong')
      }
    } catch (e) {
      if(e instanceof Error){
        dispatch(newNotification(e.message, 'error', 5) as unknown as UnknownAction)
      } else {
        console.log(e)
      }
    }
  }

  return (
    <CafeForm {...props} onSubmit={handleSubmit}>
      <div>
        <SelectCategory
          name="category"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          {Categories.map((c, i) => <option key={i} value={c.toLowerCase()}>{c.toLowerCase()}</option>)}
        </SelectCategory>
      </div>
      <div>
        <CafeButton text="change" type="submit" />
      </div>
    </CafeForm>
  )
}

export default ChangeForm