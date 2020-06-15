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
    let dpr = window.devicePixelRatio || 1
    if (dpr == 1) { return }

    let scaleCanvas = (canvas) => {
      // scale canvas up by dpr and down by the same amount in css
      //  so that it doesn't look awful on hiDPI screens
      // https://html5rocks.com/en/tutorials/canvas/hidpi

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

  getMapRenderer() {
    return this.mapRenderer
  }

  //////////////////////////////////////////////////////////////////////////////
  // DRAWING

  updateViewDimensions() {
    this.mapRenderer.setWidth(this.props.viewWidth)
    this.mapRenderer.setHeight(this.props.viewHeight)

    this.scaleCanvases(this.props.viewWidth, this.props.viewHeight)
  }

  fullDraw() {
    this.drawBackground()
    this.drawGrid()
  }

  drawGrid() {
    this.mapRenderer.clear(this.layers.grid)
    this.mapRenderer.drawGrid(this.layers.grid)
  }

  drawBackground() {
    if (this.props.image) {
      this.mapRenderer.drawBackground(this.layers.bg, this.props.image)
    }
    else {
      this.mapRenderer.drawUploadPrompt(this.layers.bg, this.layers.ui)
    }
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
    this.layers = {
      ui: this.canvas.ui.getContext('2d'),
      game: this.canvas.game.getContext('2d'),
      grid: this.canvas.grid.getContext('2d'),
      bg: this.canvas.bg.getContext('2d')
    }

    // Initialize drawing module
    this.mapRenderer = new MapRenderer(
      this.props.viewWidth, this.props.viewHeight, this.props.gridOptions
    )

    // Resize canvas elements to fix resolution on hiDPI screens
    this.scaleCanvases(this.props.viewWidth, this.props.viewHeight)

    // First draw
    this.fullDraw()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.viewWidth != this.props.viewWidth ||
        prevProps.viewHeight != this.props.viewHeight) {
      this.updateViewDimensions()
      this.fullDraw()
    }

    if (prevProps.image != this.props.image) {
      // clear upload prompt
      this.mapRenderer.clear(this.layers.ui)
      this.mapRenderer.clear(this.layers.bg)

      this.drawBackground()
    }

    if (prevProps.gridOptions != this.props.gridOptions) {
      // redraw grid layer
      this.mapRenderer.updateGridOptions(this.props.gridOptions)
      this.drawGrid(this.layers.grid)
    }
  }

  render() {
    return (
      <div id="map-stage" className="scroll"
        style={ { width: this.props.viewWidth+'px', height: this.props.viewHeight+'px' } }
      >
        <canvas id="ui-layer" width={this.props.viewWidth} height={this.props.viewHeight}
          ref={this.state.refs.ui} />
        <canvas id="game-layer" width={this.props.viewWidth} height={this.props.viewHeight}
          ref={this.state.refs.game} />
        <canvas id="grid-layer" width={this.props.viewWidth} height={this.props.viewHeight}
          ref={this.state.refs.grid} />
        <canvas id="bg-layer" width={this.props.viewWidth} height={this.props.viewHeight}
          ref={this.state.refs.bg} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    gridOptions: state.maps.grid,
    image: state.maps.image,
    map: state.maps.map,
    viewWidth: state.maps.viewWidth,
    viewHeight: state.maps.viewHeight
  }
}
export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(MapView)
