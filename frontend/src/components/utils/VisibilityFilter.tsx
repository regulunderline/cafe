import { useDispatch } from 'react-redux'

import { filterChange } from '../../reducers/filterReducer'
import CafeInput from './CafeInput'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <CafeInput
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('ALL'))}
        defaultChecked
      />
      all
      <CafeInput
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('INGREDIENTS'))}
      />
      with ingredients
      <CafeInput
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('NOINGREDIENTS'))}
      />
      without ingredients
    </div>
  )
}

export default VisibilityFilter