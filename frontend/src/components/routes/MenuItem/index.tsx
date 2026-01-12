import { useEffect, useState, type MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import type { UnknownAction } from 'redux'

import { deleteOneMenuItem, setOneMenuItem } from '../../../reducers/menuItemReducer'

import CafeButton from '../../utils/CafeButton'

import type { StoreState } from '../../../store'
import ChangeForm from './ChangeForm'
import ChangeCategoryForm from './ChangeCategoryForm'

const MenuItem = () => {
  const [changing, setChanging] = useState<string | null>(null) 
  const id = Number(useParams().id)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setOneMenuItem(id) as unknown as UnknownAction)
  }, [dispatch, id])

  const menuItem = useSelector((state: StoreState) => state.menuItems.find(i => i.id === id))
  const loggedInUser = useSelector((state: StoreState) => state.user)

  if(!menuItem){
    return <div><strong>something went wrong</strong></div>
  } else {

    const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      if(!window.confirm(`delete ${menuItem.name}? (no undo)`))return

      const success = dispatch(deleteOneMenuItem(menuItem.id, loggedInUser.token) as unknown as UnknownAction)
      if(success){
        navigate('/')
      }
    }
    
    return (
      <div>
        <div>
          name: {menuItem.name}

          {(loggedInUser && loggedInUser.admin)
            && <CafeButton 
              text="change"
              onClick={() => setChanging('name')} 
            />
          }
          {(loggedInUser && loggedInUser.admin && changing === 'name')
            && <ChangeForm
              menuItem={menuItem}
              token={loggedInUser.token}
              name='name'
            />
          }
        </div>
        
        <div>
          price: {(menuItem.price / 100).toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
          })}

          {(loggedInUser && loggedInUser.admin)
            && <CafeButton 
              text="change"
              onClick={() => setChanging('price')} 
            />
          }
          {(loggedInUser && loggedInUser.admin && changing === 'price')
            && <ChangeForm
              menuItem={menuItem}
              token={loggedInUser.token}
              name='price in cents'
            />
          }
        </div>

        <div>
          weight: {menuItem.weight}g
          
          {(loggedInUser && loggedInUser.admin)
            && <CafeButton 
              text="change"
              onClick={() => setChanging('weight')} 
            />
          }
          {(loggedInUser && loggedInUser.admin && changing === 'weight')
            && <ChangeForm
              menuItem={menuItem}
              token={loggedInUser.token}
              name='weight'
            />
          }
        </div>

        <div>
          category: {menuItem.category}
          
          {(loggedInUser && loggedInUser.admin)
            && <CafeButton 
              text="change"
              onClick={() => setChanging('category')} 
            />
          }
          {(loggedInUser && loggedInUser.admin && changing === 'category')
            && <ChangeCategoryForm
              menuItem={menuItem}
              token={loggedInUser.token}
              name='category'
            />
          }
        </div>

        <div>
          <p>ingredients:</p>
          {menuItem.ingredients 
            && <ul>
              {menuItem.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}  
            </ul>
          }

          {(loggedInUser && loggedInUser.admin && changing !== 'ingredient')
              && <CafeButton 
                text="add"
                onClick={() => setChanging('ingredient')} 
              />
            }
            {(loggedInUser && loggedInUser.admin && changing === 'ingredient')
              && <ChangeForm
                menuItem={menuItem}
                token={loggedInUser.token}
                name="ingredient"
                buttonText="add"
              />
            }
          </div>

          <div>
          {(loggedInUser && loggedInUser.admin)
              && <CafeButton 
                text="Delete Menu Item"
                onClick={handleDelete} 
              />
            }
          </div>
      </div>
    )
  }
}

export default MenuItem