import { useState, type FormHTMLAttributes, type FormEvent, useRef, useEffect } from "react"
import { useDispatch } from 'react-redux'

import { changeOneMenuItem } from '../../../reducers/menuItemReducer'

import CafeForm from '../../utils/CafeForm'
import CafeInput from '../../utils/CafeInput'
import type { UnknownAction } from "@reduxjs/toolkit"
import { newNotification } from "../../../reducers/notificationReducer"
import type { MenuItemType } from "../../../types"
import CafeButton from "../../utils/CafeButton"

const ChangeForm = ({ buttonText, menuItem, token, ...props }: 
  { buttonText?: string, menuItem: MenuItemType, token: string } & FormHTMLAttributes<HTMLFormElement>
) => {
  const ref = useRef<HTMLInputElement>(null)

  const [value, setValue] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
      if(ref.current) {
        ref.current.focus()
      }
    }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try{
      switch (props.name) {
        case 'name': {
          const success = await dispatch(changeOneMenuItem({ name: value }, menuItem.id, token) as unknown as UnknownAction)
          if(success){
            dispatch(newNotification('changed name successfully', 'success', 5) as unknown as UnknownAction)
            setValue('')
            return
          } else {
            throw new Error('something went wrong')
          }
        }

        case 'price in cents': {
          const success = await dispatch(changeOneMenuItem({ price: Number(value) }, menuItem.id, token) as unknown as UnknownAction)
          if(success){
            dispatch(newNotification('changed price successfully', 'success', 5) as unknown as UnknownAction)
            setValue('')
            return
          } else {
            throw new Error('something went wrong')
          }
        }

        case 'weight': {
          const success = await dispatch(changeOneMenuItem({ weight: Number(value) }, menuItem.id, token) as unknown as UnknownAction)
          if(success){
            dispatch(newNotification('changed weight successfully', 'success', 5) as unknown as UnknownAction)
            setValue('')
            return
          } else {
            throw new Error('something went wrong')
          }
        }

        case 'ingredient': {
          const success = await dispatch(
            changeOneMenuItem({
              ingredients: menuItem.ingredients ? menuItem.ingredients.concat(value) : [value] 
            },
              menuItem.id,
              token
            ) as unknown as UnknownAction
          )
          if(success){
            dispatch(newNotification('added ingredient successfully', 'success', 5) as unknown as UnknownAction)
            setValue('')
            return
          } else {
            throw new Error('something went wrong')
          }
        }

        default: {
          throw new Error('unsupported')
        }

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
        <CafeInput
          name={props.name}
          placeholder={`new ${props.name}`}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          ref={ref}
        />
      </div>
      <div>
        <CafeButton text={buttonText || 'change'} type="submit" />
      </div>
    </CafeForm>
  )
}

export default ChangeForm