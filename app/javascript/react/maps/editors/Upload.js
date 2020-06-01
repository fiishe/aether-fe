import React from 'react'

const Upload = props => {
  return (
    <div>
      <label htmlFor="map-bg">Select a background image.</label>
      <input type="file" className="input-file"
        id="map-bg" name="map-bg"
        accept="image/png, image/jpeg, image/jpg"
        onChange={props.handleFileInput}
        />
    </div>
  )
}

export default Upload
