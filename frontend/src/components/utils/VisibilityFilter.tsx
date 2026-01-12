import { useDispatch } from 'react-redux'

import { filterChange } from '../../reducers/filterReducer'
import CafeInput from './CafeInput'
import { useEffect } from 'react'
import { Categories } from '../../types'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(filterChange('ALL'))
  }, [dispatch])

  return (
    <div>
      <label>
        all
        <CafeInput
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('ALL'))}
          defaultChecked
        />
      </label>
      
      {Categories.map((v, i) => 
        <label key={i}>
          {v.toLowerCase()}
          <CafeInput
            type="radio"
            name="filter"
            onChange={() => dispatch(filterChange(v))}
          />
        </label>
      )}
    </div>
  )
}

export default VisibilityFilter