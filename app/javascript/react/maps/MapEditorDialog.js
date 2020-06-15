import React, { Component } from 'react'
import Upload from './editors/Upload'
import Size from './editors/Size'
import Grid from './editors/Grid'
import Terrain from './editors/Terrain'

import { connect } from 'react-redux'
import {
  gridSetAlpha,
  gridSetColor,
  gridSetTileSize
} from '../redux/modules/maps'

class MapEditorDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.dialog = this.dialog.bind(this)
  }

  dialog() {
    let gridSetAlpha = event => { this.updateGridState() }
    let gridSetColor = event => { this.setState({ color: event.target.value }) }
    let gridSetTileSize = event => { this.setState({ tileSize: event.target.value }) }

    switch (this.props.currentTool) {
      case 'upload':
        return <Upload handleFileInput={this.props.handleFileInput} />
        break

      case 'size':
        return <Size />
        break

      case 'grid':
        return <Grid />
        break

      case 'terrain':
        return <Terrain />
        break

      default:
        console.log("Invalid currentTool, rendering Upload");
        return <Upload handleFileInput={this.props.handleFileInput} />
    }
  }

  render(){
    return (
      <div id="map-dialog" className="panel">
        {this.dialog()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTool: state.maps.editor.tool
  }
}

const mapDispatchToProps = {
  gridSetAlpha,
  gridSetColor,
  gridSetTileSize
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapEditorDialog)
