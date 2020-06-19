import React from 'react'
import Tooltip from '../../common/Tooltip'

const Save = props => {
  return(
    <div>
      <h5>
        Save
        <Tooltip
          body="Modify the map's height and width (in tiles)."
          />
      </h5>
    </div>
  )
}

export default Save
