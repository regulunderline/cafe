import { useSelector } from 'react-redux'

import type * as CSS from 'csstype'
import type { ReducerState } from '../types'

const Notification = () => {

  const notification = useSelector(({ notification }: ReducerState) => notification)
  const style: CSS.Properties = {
    border: 'solid',
    padding: '10',
    borderWidth: '1',
    backgroundColor: notification && notification.type === 'error'
      ? 'red'
      : 'blue' 
  }

  if (notification.message){
    return (
      <div style={style}>
        {notification.message}
      </div>
    )
  } else {
    return (<></>)
  }
}

export default Notification