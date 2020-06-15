import React from 'react'

import { connect } from 'react-redux'
import { editSelectTool } from '../redux/modules/maps'

const MapEditorToolbar = props => {
  const currentTool = props.currentTool
  const selectTool = tool => props.editSelectTool(tool)

  return (
    <div id="map-toolbar">
      <p className={currentTool == 'upload' ? 'selected' : ''}
         onClick={ () => {selectTool('upload')} }>
        <i className="fas fa-upload" />
        upload
      </p>
      <p className={currentTool == 'size' ? 'selected' : ''}
         onClick={ () => {selectTool('size')} }>
        <i className="fas fa-expand" />
        size
      </p>
      <p className={currentTool == 'grid' ? 'selected' : ''}
         onClick={ () => {selectTool('grid')} }>
        <i className="fas fa-expand" />
        grid
      </p>
      <p className={currentTool == 'terrain' ? 'selected' : ''}
         onClick={ () => {selectTool('terrain')} }>
        <i className="fas fa-mountain" />
        terrain
      </p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentTool: state.maps.editor.tool
  }
}

const mapDispatchToProps = {
  editSelectTool
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapEditorToolbar)
