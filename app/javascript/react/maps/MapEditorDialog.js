import React, { Component } from 'react'
import Upload from './editors/Upload'
import Grid from './editors/Grid'

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
      case "grid":
        return <Grid />
        break

      case "upload":
      default:
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
    currentTool: state.maps.editor.currentTool
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
