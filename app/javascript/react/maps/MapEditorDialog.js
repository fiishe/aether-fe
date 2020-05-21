import React from 'react'

import { connect } from 'react-redux'

const MapEditorDialog = props => {
  let dialog
  switch (props.currentTool) {
    case "grid":
      dialog = (
        <div>
          grid
        </div>
      )
      break
    case "upload":
    default:
      dialog = (
        <div>
          <label htmlFor="map-bg">Upload a background image.</label>
          <input type="file" className="input-file"
                 id="map-bg" name="map-bg"
                 accept="image/png, image/jpeg, image/jpg" />
        </div>
      )
  }

  return (
    <div id="map-dialog" className="panel float-right">
      {dialog}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentTool: state.maps.editor.currentTool
  }
}

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapEditorDialog)
