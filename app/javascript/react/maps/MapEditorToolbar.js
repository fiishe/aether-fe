import React from 'react'

import { connect } from 'react-redux'
import { editSelectTool } from '../redux/modules/maps'

const MapEditorToolbar = props => {
  const selectTool = tool => props.editSelectTool(tool)

  return (
    <div id="map-toolbar">
      <p onClick={ () => {selectTool('upload')} }>
        <i className="fas fa-upload" />
        upload
      </p>
      <p onClick={ () => {selectTool('grid')} }>
        <i className="fas fa-expand" />
        grid
      </p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentTool: state.maps.editor.currentTool
  }
}

const mapDispatchToProps = {
  editSelectTool
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapEditorToolbar)
