import React, { Component } from 'react'
import Layer from './Layer'

import { connect } from 'react-redux'

import terrainIcons from 'images/terrain/terrainIcons.mjs'

class TerrainLayer extends Component {
  constructor(props) {
    super(props)

    this.shouldHide = this.shouldHide.bind(this)
    this.draw = this.draw.bind(this)
    this.redraw = this.redraw.bind(this)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  shouldHide() {
    return this.props.currentTool != 'terrain'
  }

  draw(ctx) {
    let drawTile = (x, y, tile) => {
      let terrainId = tile.symbol,
          tileSize = this.props.tileSize,
          pX = x * tileSize,
          pY = y * tileSize

      let img = new Image()

      img.onload = () => {
        ctx.drawImage(
          img,   // image
          pX, pY // offset
        )
      }

      img.src = terrainIcons[tile.name]
    }

    this.props.map.forEachTile(drawTile)
  }

  redraw(ctx) {

  }

  render() {

    return(
      <Layer
        id="terrain-layer"
        width={this.props.width} height={this.props.height}
        draw={this.draw} redraw={this.draw}
        invisible={this.shouldHide()}
        />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    map: state.maps.map,
    tileSize: state.maps.grid.tileSize,
    currentTool: state.maps.editor.tool
  }
}

export default connect(mapStateToProps, null)(TerrainLayer)
