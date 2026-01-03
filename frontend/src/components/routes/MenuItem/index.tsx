import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import type { UnknownAction } from 'redux'

import { setOneMenuItem } from '../../../reducers/menuItemReducer'

import CafeButton from '../../utils/CafeButton'

import type { StoreState } from '../../../store'
import ChangeForm from './ChangeForm'

const MenuItem = () => {
  const [changing, setChanging] = useState<string | null>(null) 
  const id = Number(useParams().id)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setOneMenuItem(id) as unknown as UnknownAction)
  }, [dispatch, id])

  const menuItem = useSelector((state: StoreState) => state.menuItems.find(i => i.id === id))
  const loggedInUser = useSelector((state: StoreState) => state.user)

  if(!menuItem){
    return <div><strong>something went wrong</strong></div>
  } else {
    
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
              name='price'
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
          <p>ingredients:</p>
          {menuItem.ingredients 
            && <ul>
              {menuItem.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}  
            </ul>
          }

          {(loggedInUser && loggedInUser.admin)
              && <CafeButton 
                text="add"
                onClick={() => setChanging('ingredient')} 
              />
            }
            {(loggedInUser && loggedInUser.admin && changing === 'ingredient')
              && <ChangeForm
                menuItem={menuItem}
                token={loggedInUser.token}
                name='ingredient'
              />
            }
          </div>
      </div>
    )
  }
}

export default MenuItem