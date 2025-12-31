import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('ALL'))}
      />
      all
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('INGREDIENTS'))}
      />
      with ingredients
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('NOINGREDIENTS'))}
      />
      without ingredients
    </div>
  )
}

export default VisibilityFilter