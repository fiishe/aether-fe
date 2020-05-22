import React, { Component } from 'react'

import { connect } from 'react-redux'
import {
  gridSetAlpha,
  gridSetColor,
  gridSetTileSize
} from '../redux/modules/maps'

class MapEditorDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: {
        alpha: 100,
        color: "#000000",
        tileSize: 16
      }
    }
    this.updateGridState = this.updateGridState.bind(this)
    this.handleChangeGridAlpha = this.handleChangeGridAlpha.bind(this)
    this.handleChangeGridColor = this.handleChangeGridColor.bind(this)
    this.handleChangeGridTileSize = this.handleChangeGridTileSize.bind(this)
    this.dialog = this.dialog.bind(this)
  }

  updateGridState(diff) {
    let newGridState = Object.assign({}, this.state.grid, diff)
    this.setState({ grid: newGridState })
  }

  handleChangeGridAlpha(newAlpha) {
    this.updateGridState({  })
  }

  dialog() {
    let gridSetAlpha = event => { this.updateGridState() }
    let gridSetColor = event => { this.setState({ color: event.target.value }) }
    let gridSetTileSize = event => { this.setState({ tileSize: event.target.value }) }

    switch (this.props.currentTool) {
      case "grid":
        return (
          <div className="row">
            <h4>Grid Options</h4>
            <div className="columns small-6 medium-4">
              <label htmlFor="grid-color">Color</label>
              <input type="color"
                id="grid-color" name="grid-color"
                value={this.state.grid.color}
                onChange={gridSetColor}
                />
            </div>
            <div className="columns small-6 medium-4">
              <label htmlFor="grid-alpha">Opacity (%)</label>
              <input type="number"
                id="grid-alpha" name="grid-alpha"
                min="0" max="100" value={this.state.grid.alpha}
                onChange={gridSetAlpha}
                />
            </div>
            <div className="columns small-6 medium-4">
              <label htmlFor="grid-size">Tile size (px)</label>
              <input type="number"
                id="grid-size" name="grid-size"
                min="16" max="64" value={this.state.grid.tileSize}
                onChange={gridSetTileSize}
                />
            </div>
          </div>
        )
        break

      case "upload":
      default:
        return (
          <div>
            <label htmlFor="map-bg">Upload a background image.</label>
              <input type="file" className="input-file"
                id="map-bg" name="map-bg"
                accept="image/png, image/jpeg, image/jpg"
                onChange={this.props.handleFileInput}
                />
          </div>
        )
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
    currentTool: state.maps.editor.currentTool,
    dialogIsOpen: state.maps.editor.dialogIsOpen,
    grid: state.maps.grid
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
