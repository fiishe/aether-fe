import React, { Component } from 'react'

import { connect } from 'react-redux'

import TileMap from '../../../game/models/TileMap'
import MapRenderer from '../../../game/client/MapRenderer'
import { mapConfig } from '../../../game/models/TileMap'

class MapView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      refs: {
        ui: React.createRef(),
        game: React.createRef(),
        grid: React.createRef(),
        bg: React.createRef()
      }
    }

    this.canvas = {}
    this.ctx = {}

    this.mapRenderer = null
    this.viewWidth = this.props.mapWidth * this.props.gridOptions.tileSize
    this.viewHeight = this.props.mapHeight * this.props.gridOptions.tileSize

    // binds
    this.getPWidth = this.getPWidth.bind(this)
    this.getPHeight = this.getPHeight.bind(this)
    this.scaleCanvases = this.scaleCanvases.bind(this)
    this.updateViewDimensions = this.updateViewDimensions.bind(this)
    this.fullDraw = this.fullDraw.bind(this)
    this.drawBackground = this.drawBackground.bind(this)
    this.drawGrid = this.drawGrid.bind(this)
  }

  scaleCanvases(targetWidth, targetHeight) {
    let scaleCanvas = canvas => {
      // scale canvas up by dpr and down by the same amount in css
      //  so that it doesn't look awful on hiDPI screens
      // https://html5rocks.com/en/tutorials/canvas/hidpi

      let dpr = window.devicePixelRatio || 1    // device pixel ratio

      canvas.width = targetWidth * dpr
      canvas.height = targetHeight * dpr
      canvas.style.width = `${targetWidth}px`
      canvas.style.height = `${targetHeight}px`

      let ctx = canvas.getContext('2d')
      ctx.scale(dpr, dpr)
    }

    for (let layerName in this.canvas) {
      scaleCanvas(this.canvas[layerName])
    }
  }

  // width in pixels
  getPWidth() {
    return this.props.map.getWidth() * this.props.gridOptions.tileSize
  }

  getPHeight() {
    return this.props.map.getHeight() * this.props.gridOptions.tileSize
  }

  //////////////////////////////////////////////////////////////////////////////
  // DRAWING

  updateViewDimensions() {
    this.viewWidth = this.props.mapWidth * this.props.gridOptions.tileSize
    this.viewHeight = this.props.mapHeight * this.props.gridOptions.tileSize
  }

  fullDraw() {
    this.drawBackground()
    this.drawGrid()
  }

  drawBackground() {
    if (this.props.image) {
      this.mapRenderer.drawBackground(this.props.image)
    }
    else {
      this.mapRenderer.drawDefaultBackground()
    }
  }

  drawGrid() {
    this.mapRenderer.clear(this.mapRenderer.layers.grid)
    this.mapRenderer.drawGrid(this.props.gridOptions)
  }

  //////////////////////////////////////////////////////////////////////////////
  // LIFECYCLE

  componentDidMount() {
    // Resolve references to get the canvas elements
    this.canvas = {
      ui: this.state.refs.ui.current,
      game: this.state.refs.game.current,
      grid: this.state.refs.grid.current,
      bg: this.state.refs.bg.current
    }

    // Get references to drawing contexts
    this.ctx = {
      ui: this.canvas.ui.getContext('2d'),
      game: this.canvas.game.getContext('2d'),
      grid: this.canvas.grid.getContext('2d'),
      bg: this.canvas.bg.getContext('2d')
    }

    // Initialize drawing module
    this.mapRenderer = new MapRenderer(
      this.props.map, this.ctx, this.props.gridOptions
    )

    // Resize canvas elements to fix resolution on hiDPI screens
    this.scaleCanvases(this.viewWidth, this.viewHeight)

    // First draw
    this.fullDraw()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.size != this.props.size) {
      console.log("size changed");
      console.log(this.props.size);
    }

    if (prevProps.image != this.props.image) {
      this.drawBackground()
    }

    if (prevProps.gridOptions != this.props.gridOptions) {
      // redraw grid layer
      this.drawGrid()
    }
  }

  render() {
    return (
      <div id="map-stage" className="scroll"
        style={ { width: this.viewWidth+'px', height: this.viewHeight+'px' } }
      >
        <canvas id="ui-layer" width={this.width} height={this.height}
          ref={this.state.refs.ui} />
        <canvas id="game-layer" width={this.width} height={this.height}
          ref={this.state.refs.game} />
        <canvas id="grid-layer" width={this.width} height={this.height}
          ref={this.state.refs.grid} />
        <canvas id="bg-layer" width={this.width} height={this.height}
          ref={this.state.refs.bg} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    map: state.maps.map,
    mapWidth: state.maps.size.width,
    mapHeight: state.maps.size.height,
    image: state.maps.image,
    gridOptions: state.maps.grid
  }
}
export default connect(
  mapStateToProps,
  null
)(MapView)
