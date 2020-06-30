import React from 'react'
import Tooltip from '../../common/Tooltip'

const Upload = props => {
  return (
    <div>
      <h5>
        Upload
        <Tooltip
          body="Select a background image."
          />
      </h5>
      <input type="file" className="input-file"
        id="map-bg" name="map-bg"
        accept="image/png, image/jpeg, image/jpg"
        onChange={props.handleFileInput}
        />
    </div>
  )
}

export default Upload
